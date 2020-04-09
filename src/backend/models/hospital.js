const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Hospital = new Schema(
    {
        name: {type: String, required: true},
        Address: {type: String, required: true},
        status: {type: Number, default: 1}
    },
    { timestamps: true }
);

module.exports = { Hospital: mongoose.model("Hospital", Hospital) };