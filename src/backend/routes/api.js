const jwt = require('jsonwebtoken');


module.exports = function(app, secret)
{
    const authenticateJWT = (req, res, next) =>
    {
        const authHeader = req.headers.authorization;

        if(authHeader)
        {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, secret, (err, user) =>
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

    app.put('/user/create', (req, res) => {});
    app.post('/user/login', (req, res) => {});
    app.put('/message/create', authenticateJWT, (req, res) => {});
    app.get('/message/fetch', authenticateJWT, (req, res) => {});
    app.put('/patient/create', authenticateJWT, (req, res) => {});
    app.get('/patient/fetch', authenticateJWT, (req, res) => {});
};