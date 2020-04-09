const common = require("./common");
const message = require("../models/message");


const create = (req, res) =>
{
    const user = common.fetchPayloadFromToken(req);

    let message = message.Message();
    message.user_id = user.id;
    message.patient_id = req.body.patient_id;
    message.message = req.body.message;

    message
        .save()
        .then(
            () =>
            {
                res.json({message: "Message created successfully"});
            })
        .catch(
            (err) =>
            {
                res.status(500).json(common.errorResponse(err));
            });
};


const fetch = (req, res) =>
{
    const user = common.fetchPayloadFromToken(req);
    let query = {};

    if(user.type != "admin")
        query["user_id"] = user.id;

    if(req.body.hasOwnProperty("patient_id"))
        query["patient_id"] = req.body.patient_id;

    message
        .Message
        .find(query)
        .then(
            (result) =>
            {
                if(result)
                {
                    res.json({messages: result});
                }
                else
                {
                    res.status(404).json({message: "Messages not found"});
                }
            })
        .catch(
            (err) =>
            {
                res.status(500).json(common.errorResponse(err));
            });
};


const deleteMessages = (req, res) =>
{

};


module.exports =
    {
        create: create,
        fetch: fetch,
        deleteMessages: deleteMessages
    };
