const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const SERVER_HOST = process.env.hasOwnProperty("SERVER_HOST") ? process.env.SERVER_HOST : "localhost";
const SERVER_PORT = process.env.hasOwnProperty("SERVER_PORT") ? parseInt(process.env.SERVER_PORT) : 8080;
const MONGO_HOST = process.env.hasOwnProperty("MONGO_HOST") ? process.env.MONGO_HOST : "localhost";
const MONGO_PORT = process.env.hasOwnProperty("MONGO_PORT") ? parseInt(process.env.MONGO_PORT) : 27017;
const MONGO_USER = process.env.hasOwnProperty("MONGO_USER") ? process.env.MONGO_USER : "admin";
const MONGO_PASS = process.env.hasOwnProperty("MONGO_PASSWORD") ? process.env.MONGO_PASSWORD : "admin";
const MONGO_DBNAME = process.env.hasOwnProperty("MONGO_DBNAME") ? process.env.MONGO_DBNAME : "covconnect";
const SECRET = process.env.hasOwnProperty("JWT_SECRET") ? process.env.JWT_SECRET : "thisisasecret";

const common = require("./controller/common");
common.setSecret(SECRET);

const dbRoute = "mongodb://" + MONGO_USER + ":" + MONGO_PASS + "@" + MONGO_HOST + ":" + MONGO_PORT + "/" + MONGO_DBNAME;
mongoose.connect(dbRoute, {useUnifiedTopology: true, useNewUrlParser: true, 'useCreateIndex': true});

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
