const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Patient = new Schema(
    {
        name: {type: String, required: true},
        dob: {type: Number, required: true},
        hospital_id: {type: String, required: true},
        status: {type: Number, default: 1}
    },
    { timestamps: true }
);

module.exports = { Patient: mongoose.model("Patient", Patient) };