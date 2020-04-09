const jwt = require("jsonwebtoken");


let SECRET = null;


setSecret = (secret) =>
{
    SECRET = secret;
};


fetchSecret = () =>
{
    return SECRET;
};


errorResponse = (err) =>
{
    let response = {};

    if(err.hasOwnProperty("message") && err.message !== null)
        response["message"] = err.message;

    return response;
};


fetchPayloadFromToken = (req) =>
{
    return jwt.decode(req.headers.authorization.split(' ')[1]);
};


module.exports =
    {
        setSecret: setSecret,
        fetchSecret: fetchSecret,
        errorResponse: errorResponse,
        fetchPayloadFromToken: fetchPayloadFromToken
    };
