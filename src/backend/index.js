const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const SERVER_HOST = process.env.SERVER_HOST;
const SERVER_PORT = parseInt(process.env.SERVER_PORT);
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = parseInt(process.env.MONGO_PORT);
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASSWORD;
const MONGO_DBNAME = process.env.MONGO_DBNAME;
const SECRET = process.env.JWT_SECRET;


const dbRoute = "mongodb://" + MONGO_USER + ":" + MONGO_PASS + "@" + MONGO_HOST + ":" + MONGO_PORT + "/" + MONGO_DBNAME;
mongoose.connect(dbRoute, {useNewUrlParser: true});

let db = mongoose.connection;
db.once("open", () => console.log("Connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

require("./routes/api")(app, SECRET);

app.listen(
    SERVER_PORT, SERVER_HOST,
        () =>
        {
            console.log("Listening on host: " + SERVER_HOST + " and port: " + SERVER_PORT)
        });
