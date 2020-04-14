const common = require("./common");
const messageModel = require("../models/message");


const create = (req, res) =>
{
    const user = common.fetchPayloadFromToken(req);

    let message = messageModel.Message();
    message.user_id = user.id;
    message.patient_id = req.body.patient_id;
    message.message = req.body.message;

    if(user.type == "blocked"){
        res.status(405).json({message: "User not allowed to send messages"});
    }

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

    messageModel
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
    const user = common.fetchPayloadFromToken(req);

    if(user.type != "admin")
    {
        res.status(405).json({message: "Operation not allowed"});
    }

    messageModel
        .Message
        .find({id: req.body.id})
        .then(
            (result) =>
            {
                if (result){
                    result.remove();
                    res.json({message: "Message deleted successfully."})
                }
                else
                {
                    res.status(404).json({message: "Messages not found"});
                }
            }

        )
};


module.exports =
    {
        create: create,
        fetch: fetch,
        deleteMessages: deleteMessages
    };
