const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Handlebars Configuration
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Controller Configuration for Routing
const routes = require("./controllers/newsController.js");
app.use(routes);

// Connection to MongoDB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/webnewsdb";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.listen(PORT, () => console.log("App running on port " + PORT + "!"));