var mongoose = require("mongoose"),
    Article;

module.exports = function(app, config) {
    Article = require(config.rootPath + "/models/ArticleModel");

    //CRUD
    app.post("/article/create/:title", function(req, res, next) {
        var title = req.param("title"),
            doc;
        doc = new Article({"title": title});
        doc.save(); 
    });

    app.post("/article/update/:id", function(req, res, next) {
        var id = req.param("id"),
            title = req.body.title,
            e;

        if (title) {
            Article.findById(id, function(err, doc) {
                if (err) {
                    next(err);
                }
                doc.title = title;
                doc.save();
                res.json(doc);
            });
        } else {
            e = new Error("Article update was not supplied a new title"); 
            e.status = 500;
            next(e);
        }

    });

    app.get("/article/read/:id", function(req, res, next) {
        var id = req.param("id"); 
        Article.findById(id, function(err, doc) {
            if (err) {
                next(err);
            }
            res.json(doc);
        });
        
    });

    app.get("/article/destroy/:id", function(req, res, next) {
        var id = req.param("id"); 
        Article.findById(id, function(err, doc) {
            if (err) {
                next(err);
            }
            doc.remove();
        });

    });

    //PRACTICAL
    app.get("/article/all", function(req, res, next) {
        Article.find({}, function(err, docs) {
            return res.json(docs); 
        });
    });


}
