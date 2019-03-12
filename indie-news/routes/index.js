var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

module.exports = app => {

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{ title: 'Indie News' });
});



 // Load saved articles page
 app.get("/saved-articles", (req, res) => {
  db.Article.find({saved: true})
    .then(dbArticle => res.render("saved-articles", {
      Article: dbArticle
    }))
    .catch(err => res.json(err));
});

// Load notes page
app.get("/articles/:id", (req, res) => {
  db.Article.find({_id: req.params.id})
    .populate("notes")
    .then(dbArticle => res.render("read-note", {
      Article: dbArticle,
      Note: dbArticle[0].notes
    }))
    .catch(err => res.json(err));
});

// Render 404 page for any unmatched routes
app.get("*", (req, res) => {
  res.render("404", {});
});
}


module.exports = router;
