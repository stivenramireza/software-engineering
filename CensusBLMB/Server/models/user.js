const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ['admin', 'collector', 'respondent'],
        required: true
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    CWL: {
        type: String
    },
    RNO: {
        type: Number,
        min: 0
    },
    ECN: {
        type: String
    },
    CFN: {
        type: String
    }
}, { collection: 'users' });

const CounterSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    CWL: {
        type: Number,
        default: 0
    }
});
const Counter = mongoose.model('Counter', CounterSchema);

UserSchema.pre('validate', function (next) {
    if (this.type === 'collector') {
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };
        Counter.findByIdAndUpdate({ _id: 'entityId' }, { $inc: { CWL: 1 } }, options, (err, counter) => {
            if (err)
                return next(err);
            this.CWL = counter.CWL;
            next();
        });
    } else
        next();
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.addUserPass = (user, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err)
                throw err;
            user.password = hash;
            user.save(callback);
        });
    });
}

module.exports.comparePasswords = (possiblePass, hash, callback) => {
    bcrypt.compare(possiblePass, hash, (err, match) => {
        if (err)
            throw err;
        callback(null, match);
    });
}
