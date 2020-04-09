const jwt = require("jsonwebtoken");


const common = require("./common");
const patient = require("../models/patient");


const create = (req, res) =>
{
    const user = jwt.decode(req.headers.authorization).payload;

    let patient = patient.Patient();
    patient.name = req.body.name;
    patient.dob = req.body.dob;
    patient.user_id = user.id;
    patient.hospital_id = req.body.hospital_id;

    patient.save()
        .then(
            () =>
            {
                res.json({message: "User created successfully"});
            })
        .catch(
            (err) =>
            {
                if(err.code === 11000)
                    res.status(400).json({message: "User already exists"});
                else
                    res.status(500).json(common.errorResponse(err));
            });
};


const fetch = (req, res) =>
{
    
};


module.exports =
    {
        create: create,
        fetch: fetch
    };