const mongoose = require('mongoose');

const FormSchema = mongoose.Schema({
    ECN: {
        type: String,
        unique: true
    },
    locked: {
        type: String
    },
    // First page
    firstNames: {
        type: String
    },
    lastNames: {
        type: String
    },
    gender: {
        type: String
    },
    birthdate: {
        type: String
    },
    address: {
        type: String
    },
    timeLivedInAddress: {
        type: String
    },
    addressFiveYearsAgo: {
        type: String
    },
    censusNightAddress: {
        type: String
    },
    countryOfBirth: {
        type: String
    },
    dateOfArrival: {
        type: String
    },
    ethnicGroup: {
        type: String
    },
    // Second page
    languages: {
        type: String
    },
    indigenous: {
        type: String
    },
    tribe: {
        type: String
    },
    tribeName: {
        type: String
    },
    tribeLocation: {
        type: String
    },
    healthProblems: {
        type: String
    },
    disability: {
        type: String
    },
    religion: {
        type: String
    },
    relativesLivingInHouse: {
        type: String
    },
    // Third page
    smoker: {
        type: String
    },
    regularSmoker: {
        type: String
    },
    maritalStatus: {
        type: String
    },
    ownerOfDwelling: {
        type: String
    },
    motherOf: {
        type: String
    },
    highSchoolQualifications: {
        type: String
    },
    anotherQualifications: {
        type: String
    },
    highestQualifications: {
        type: String
    },
    studentStatus: {
        type: String
    },
    meansOfIncome: {
        type: String
    },
    totalIncome: {
        type: String
    },
    // Fourth page
    jobStatus: {
        type: String
    },
    typeOfEmployee: {
        type: String
    },
    jobOccupation: {
        type: String
    },
    tasksOrDuties: {
        type: String
    },
    nameOfBusiness: {
        type: String
    },
    mainActivityOfBusiness: {
        type: String
    },
    siteOfWork: {
        type: String
    },
    buildingName: {
        type: String
    },
    businessStreet: {
        type: String
    },
    businessRural: {
        type: String
    },
    businessCity: {
        type: String
    },
    hoursPerWeek: {
        type: String
    },
    wayOfTraveling: {
        type: String
    },
    lookingForWork: {
        type: String
    },
    meansOfLookingToWork: {
        type: String
    },
    readyToWork: {
        type: String
    },
    activitiesDoneWithoutPay: {
        type: String
    },
    phoneNumber: {
        type: String
    }
}, { collection: 'forms' });

const Form = module.exports = mongoose.model('Form', FormSchema);
