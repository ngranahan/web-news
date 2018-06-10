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
mongoose.connect("mongodb://localhost/webnewsdb");

app.listen(PORT, () => console.log("App running on port " + PORT + "!"));