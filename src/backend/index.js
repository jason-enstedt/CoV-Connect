const fs = require("fs");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const config = JSON.parse(fs.readFileSync("./config/config.json"));

const common = require("./controller/common");
common.setSecret(config.secret);

const dbRoute = "mongodb://" + config.database.username + ":" + config.database.password + "@" +
                config.database.host + ":" + config.database.port + "/" + config.database.database;

mongoose.connect(dbRoute, {useUnifiedTopology: true, useNewUrlParser: true, 'useCreateIndex': true});

let db = mongoose.connection;
db.once("open", () => console.log("Connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

require("./routes/api")(app);

app.listen(
    config.server.port, config.server.host,
        () =>
        {
            console.log("Listening on host: " + config.server.host +
                        " and port: " + config.server.port);
        });

module.exports = app;