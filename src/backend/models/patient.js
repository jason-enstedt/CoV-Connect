const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Patient = new Schema(
    {
        name: {type: String, required: true},
        dob: {type: Number, required: true},
        hospital_id: {type: String, required: true},
        user_id: {type: String, required: true},
        status: {type: Number, default: 1}
    },
    { timestamps: true }
);

Patient.index({name: 1, dob: 1, user_id: 1, hospital_id: 1}, {unique: true});

module.exports = { Patient: mongoose.model("Patient", Patient) };