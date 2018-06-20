const express = require("express");

const router = express.Router();

const axios = require("axios");
const cheerio = require("cheerio");

const db = require("../models");

// Route 1 - Renders homepage and scraped articles from the database
router.get("/", (req, res) => {
    db.Article.find({}).then((dbArticle) => {
        res.render("index", { articles: dbArticle });
    })
    .catch((err) => {
        res.json(err);
    });
});

// Route 2 - Scrapes articles from A List Apart and stores them in the database, then redirects to the homepage where the articles from the database display
// TODO: "get articles" button will need to route to /scrape, then this will need to redirect to index with articles populating the page.
router.get("/scrape", (req, res) => {
    axios.get("http://alistapart.com/articles").then((response) => {
        const $ = cheerio.load(response.data);
        // Below will grab every h3 with an li tag, aka every title and it's link
        // TODO: Refactor to grab summary text. Will need to get second nested p tag - no unique class or id
        $(".entry-title").each((i, element) => {
            // Then save an empty object
            let result = {};
            // Then save the text and href of the link inside of the h3
            result.title = $(element).children("a").text();
            result.link = $(element).children("a").attr("href");

           db.Article.findOneAndUpdate(
               {title: result.title}, 
               result, 
               {upsert: true, new: true, runValidators: true})
               .then((dbArticle) => {
                   console.log(dbArticle);
               })
               .catch((err) => {
                   return res.json(err);
               });
        });
        res.redirect('/');
    });
});


// Route 3 - Stores favorite articles to the database
router.post("/article/:id", (req, res) => {
    // Find the article by it's id and set saved equal to true
    db.Article.findOneAndUpdate({ _id: req.params.id }, {saved: true })
    .then((dbArticleSaved) => {
        console.log("article saved")
        res.json(dbArticleSaved)
    })
    .catch((err) => {
        res.json(err);
    });
});

// Route 4 - Stores notes to the database
// TODO: Get this working...
router.post("/note/:id", (req, res) => {
    // Find the article by it's id and set saved equal to true
    db.Note.create(req.body)
    .then((dbNote) => {
        console.log("note saved")
        res.json(dbNote)
    })
    .catch((err) => {
        res.json(err);
    });
});

// Route 5 - Grabs saved articles from the database
// This route grabs articles from the database
// TODO: This might not be necessary anymore
router.get("/savedarticles", (req, res) => {
    db.Article.find({ saved: true }).then((dbSavedArticle) => {
        res.render("saved", { articles: dbSavedArticle });
    })
    .catch((err) => {
        res.json(err);
    });
}); 


module.exports = router;