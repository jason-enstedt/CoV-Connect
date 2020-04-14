const jwt = require('jsonwebtoken');


const common = require("../controller/common");
const userController = require("../controller/user");
const patientController = require("../controller/patient");
const hospitalController = require("../controller/hospital");
const messageController = require("../controller/message");


module.exports = function(app)
{
    const authenticateJWT = (req, res, next) =>
    {
        const authHeader = req.headers.authorization;

        if(authHeader)
        {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, common.fetchSecret(), (err, user) =>
            {
                if(err)
                    return res.sendStatus(403);

                req.user = user;
                next();
            });
        }
        else
        {
            res.sendStatus(401);
        }
    };

    app.put(
        '/user/register',
        (req, res) =>
        {
            userController.create(req, res);
        });

    app.post(
        '/user/login',
        (req, res) =>
        {
            userController.login(req, res);
        });

    app.put(
        '/hospital/create',
        authenticateJWT,
        (req, res) =>
        {
            hospitalController.create(req, res);
        });

    app.get(
        '/hospital/fetch',
        authenticateJWT,
        (req, res) =>
        {
            hospitalController.fetch(req, res);
        });

    app.put(
        '/patient/create',
        authenticateJWT,
        (req, res) =>
        {
            patientController.create(req, res);
        });

    app.get(
        '/patient/fetch',
        authenticateJWT,
        (req, res) =>
        {
            patientController.fetch(req, res);
        });

    app.put(
        '/message/create',
        authenticateJWT,
        (req, res) =>
        {
            messageController.create(req, res);
        });

    app.get(
        '/message/fetch',
        authenticateJWT,
        (req, res) =>
        {
            messageController.fetch(req, res);
        });

    app.delete(
        '/message/delete',
        authenticateJWT,
        (req, res) =>
        {
            messageController.deleteMessages(req, res);
        });
};