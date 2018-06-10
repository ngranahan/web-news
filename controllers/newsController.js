const express = require("express");

const router = express.Router();

const axios = require("axios");
const cheerio = require("cheerio");

const db = require("../models");

router.get("/", (req, res) => {
    res.render("index");
});

// TODO: "get articles" button will need to route to /scrape, then this will need to redirect to index with articles populating the page.
router.get("/scrape", (req, res) => {
    axios.get("http://alistapart.com/articles").then((response) => {
        const $ = cheerio.load(response.data);
        // Below will only grab the article title and link, could improve by grabbing author and article summary
        // Grab every h3 within a li tag
        $(".entry-title").each((i, element) => {
            // Then save an empty object
            let result = {};
            // Then save the text and href of the link inside of the h3
            result.title = $(element).children("a").text();
            result.link = $(element).children("a").attr("href");
            
            console.log(result);
            // Then create a new article in the database using the article model and the result object containing the scrape results
            db.Article.create(result)
            .then((dbArticle) => {
                console.log(dbArticle);
            })
            .catch((err) => {
                return res.json(err);
            });
        });
        res.send("Scrape Complete");
    });
});

router.get("/savedarticles", (req, res) => {
    res.render("saved");
});

module.exports = router;