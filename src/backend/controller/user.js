const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const common = require("./common");
const userModel = require("../models/user");


const create = (req, res) =>
{
    let user = userModel.User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.passhash = bcrypt.hashSync(req.body.password, 10);

    user.save()
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


const login = (req, res) =>
{
    let email = req.body.email;
    let password = req.body.password;

    userModel
        .User
        .findOne({email: email})
        .then(
            (result) =>
            {
                if(result)
                {
                    if(bcrypt.compareSync(password, result.passhash))
                    {
                        const token = jwt.sign({id: result._id, email: result.email,
                                                   name: result.name, dob: result.dob,
                                                   type: result.type},
                                               common.fetchSecret(),
                                               {expiresIn: "24h"});
                        res.json({message: "User authenticated successfully", token: token});
                    }
                    else
                    {
                        res.status(401).json({message: "Unauthenticated"});
                    }
                }
                else
                {
                    res.status(404).json({message: "User not found."});
                }
            })
        .catch(
            (err) =>
            {
                res.status(500).json(common.errorResponse(err));
            });
};


module.exports =
    {
        create: create,
        login: login
    };
