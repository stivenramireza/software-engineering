const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const Luhn = require('luhn-js');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/user');
const Form = require('./models/form');

const port = process.env.SERVER_PORT;
const mongoHost = 'ds231588.mlab.com:31588/bolumbia';
const mongoURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${mongoHost}`;

mongoose.connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
mongoose.connection.on('connected', () => console.log(`Successfully connected to DB at ${mongoHost}`));
mongoose.connection.on('error', err => console.log(`Database connection error: ${err}`));
app = express();
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-headers','*');
    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,GET,DELETE');
        return res.status(200).json({});
    }
});
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: process.env.JWT_SECRET
    },
    (jwt_payload, done) => {
        User.findById(jwt_payload._id, (err, user) => {
            if (err)
                return done(err, false);
            if (user)
                return done(null, user);
            else
                return done(null, false);
        });
    })
);

app.post('/authenticate', (req, res) => {
    const ECN = req.body.ECN;
    if (ECN && !Luhn.isValid(ECN.substr(0, 9)))
        return res.status(400).json({ success: false, msg: 'Invalid ECN' });
    const CFN = req.body.CFN;
    const username = req.body.username;
    const password = req.body.password;
    User.findOne(ECN ? { ECN, CFN } : { username }, (err, user) => {
        if (err)
            throw err;
        if (!user)
            return res.status(400).json({ success: false, msg: 'User not found' });
        const response = {
            success: true,
            token: `JWT ${jwt.sign(user.toObject(), process.env.JWT_SECRET, { expiresIn: 604800 })}`,
            user: {
                id: user._id,
                type: user.type
            }
        };
        if (user.type === 'respondent')
            res.status(200).json(response);
        else
            User.comparePasswords(password, user.password, (err, match) => {
                if (err)
                    throw err;
                if (match)
                    res.status(200).json(response);
                else
                    res.status(400).json({ success: false, msg: 'Wrong password' });
            });
    });
});

checkPermissions = (req, res, validUserTypes, next) => {
    if (validUserTypes.includes(req.user.type))
        next();
    else
        res.status(401).json({ success: false, msg: 'Unauthorized' });
}

app.post('/registerCollector', passport.authenticate('jwt', { session: false }), (req, res) => {
    checkPermissions(req, res, ['admin'], () => {
        User.findOne({ username: req.body.username }, (err, user) => {
            if (err)
                throw err;
            if (user)
                return res.status(400).json({ success: false, msg: 'Username already in use' });
            User.addUserPass(
                new User({
                    type: 'collector',
                    username: req.body.username,
                    password: req.body.password,
                    RNO: 0
                }),
                (err, user) => {
                    if (err)
                        res.status(400).json({ success: false, msg: 'Failed to register collector' });
                    else
                        res.status(200).json({ success: true, msg: 'Collector successfully registered' });
                });
        });
    });
});

const registerFormAndRespondent = (req, res) => {
    const ECNNum = ('0000000000' + Math.floor(Math.random() * 100000000)).substr(-8);
    const ECNPadding = ('0000000000' + Math.floor(Math.random() * 1000)).substr(-3);
    const ECN = Luhn.generate(ECNNum) + ECNPadding;
    Form.findOne({ ECN }, (err, form) => {
        if (err)
            throw err;
        if (form)
            registerFormAndRespondent(req, res);
        else {
            const newForm = new Form({ ECN });
            newForm.save((err, form) => {
                if (err)
                    throw err;
                User.findByIdAndUpdate({ _id: req.user._id }, { $inc: { RNO: 1 } }, (err, user) => {
                    if (err)
                        throw err;
                    const CWL = ('0000000000' + user.CWL).substr(-7);
                    const RNO = ('0000000000' + (user.RNO + 1)).substr(-4);
                    const CFN = Luhn.generate(CWL) + Luhn.generate(RNO);
                    const newUser = new User({ type: 'respondent', ECN: form.ECN, CFN });
                    newUser.save((err, user) => {
                        if (err)
                            res.status(400).json({ success: false, msg: 'Failed to register respondent' });
                        else
                            res.status(200).json({
                                success: true,
                                msg: 'Respondent successfully registered',
                                user: {
                                    ECN: user.ECN,
                                    CFN: user.CFN
                                }
                            });
                    });
                });
            });
        }
    });
}

app.post('/registerFormAndRespondent', passport.authenticate('jwt', { session: false }), (req, res) => {
    checkPermissions(req, res, ['collector'], () => registerFormAndRespondent(req, res));
});

const firstPageFields = 'firstNames lastNames gender birthdate address timeLivedInAddress addressFiveYearsAgo ' +
    'censusNightAddress countryOfBirth dateOfArrival ethnicGroup';

const secondPageFields = 'languages indigenous tribe tribeName tribeLocation healthProblems disability religion '
    + 'relativesLivingInHouse';

const thirdPageFields = 'smoker regularSmoker maritalStatus ownerOfDwelling motherOf highSchoolQualifications ' +
    'anotherQualifications highestQualifications studentStatus meansOfIncome totalIncome';

const fourthPageFields = 'jobStatus typeOfEmployee jobOccupation tasksOrDuties nameOfBusiness '
    + 'mainActivityOfBusiness siteOfWork buildingName businessStreet businessRural' + 
    ' businessCity hoursPerWeek wayOfTraveling lookingForWork meansOfLookingToWork ' +
'readyToWork activitiesDoneWithoutPay phoneNumber';

const getFields = fieldsList => (req, res) => checkPermissions(req, res, ['respondent'],
    () => Form.find({ ECN: req.user.ECN }, fieldsList, (err, form) => {
        if (err)
            throw err;
        res.status(200).json({ success: true, form: form[0] });
    }));

app.get('/firstPage', passport.authenticate('jwt', { session: false }), getFields(firstPageFields));

app.get('/secondPage', passport.authenticate('jwt', { session: false }), getFields(secondPageFields));

app.get('/thirdPage', passport.authenticate('jwt', { session: false }), getFields(thirdPageFields));

app.get('/fourthPage', passport.authenticate('jwt', { session: false }), getFields(fourthPageFields));

app.post('/updateForm', passport.authenticate('jwt', { session: false }), (req, res) => {
    checkPermissions(req, res, ['respondent'], () => Form.findOneAndUpdate({ ECN: req.user.ECN }, { $set: req.body },
        (err, form) => {
            if (err)
                throw err;
            if (form.locked === 'true')
                res.status(400).json({ success: false, msg: "Form already confirmed - Can't be updated anymore" });
            else
                res.status(200).json({ success: true, msg: 'Form successfully updated' });
        }));
});

app.post('/lockForm', passport.authenticate('jwt', { session: false }), (req, res) => {
    checkPermissions(req, res, ['respondent'], () => Form.findOneAndUpdate({ ECN: req.user.ECN }, { $set: { locked: 'true' } },
        (err, form) => {
            if (err)
                throw err;
            if (form.locked === 'true')
                res.status(400).json({ success: false, msg: 'Form already confirmed' });
            else
                res.status(200).json({ success: true, msg: 'Form successfully updated' });
        }));
});

app.listen(port, () => console.log(`Bolumbia server now listening on port ${port}!`));
