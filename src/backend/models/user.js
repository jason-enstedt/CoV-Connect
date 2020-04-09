const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const User = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, unique: true, required: true},
        passhash: {type: String, required: true},
        dob: {type: Number, required: true},
        type: {type: String, required: true, default: "user"},
        status: {type: Number, default: 1}
    },
    { timestamps: true }
);

module.exports = { User: mongoose.model("User", User) };