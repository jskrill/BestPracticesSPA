var mongoose = require("mongoose"),
    _ = require("underscore"),
    Article;

module.exports = function(app, config) {
    Article = require(config.rootPath + "/models/ArticleModel");

    //CRUD
    app.post("/article/create", function(req, res, next) {
        var data = req.body,
            doc  = new Article(data);

        doc.save(function(err, savedDoc){
            if (err) {
                next(err);
            }
            res.json(savedDoc);
        }); 
    });

    app.put("/article/update", function(req, res, next) {
        var data = req.body,
            _id = req.body._id,
            e;

        if (_id){ 
            Article.findById(_id, function(err, doc) {
                if (err) {
                    next(err);
                }
                _.extend(doc, data);
                doc.save(function(err, savedDoc){
                    if (err) {
                        next(err);
                    }
                    res.json(savedDoc);
                });
            });
        } else {
            e = new Error("Article _id was not supplied"); 
            e.status = 500;
            next(e);
        }

    });

    app.get("/article/read/:id", function(req, res, next) {
        var _id = req.param("id"); 
        Article.findById(_id, function(err, doc) {
            if (err) {
                next(err);
            }
            res.json(doc);
        });
        
    });

    app.delete("/article/destroy/:id", function(req, res, next) {
        var _id = req.param("id"); 
        Article.findById(_id, function(err, doc) {
            if (err) {
                next(err);
            }
            doc.remove(function(err){
                if (err) {
                    next(err);
                }
                res.json(200);
            });
        });

    });

    //PRACTICAL
    app.get("/article/all", function(req, res, next) {
        Article.find({}, function(err, docs) {
            if (err) {
                next(err);
            }
            res.json(docs); 
        });
    });

    app.get("/article/count", function(req, res, next) {
        Article.count(function(err, c) {
            if (err) {
                next(err);
            }
            res.json({"count": c});
        });
    });

    app.get("/article/populate", function(req, res, next) {
        var model,
            titles = ["PHP", "Ruby", "Perl", "Python", "JSP", "ASP.NET",
                      "Nodejs", "Mongoose", "Express", "Java", "Javascript",
                      "Meteor", "Angular", "Dogo Toolkit", "MooTools",
                      "YUI Library"];
        _each(titles, function(title) {
            model =  new Article({"title": title});
            model.save(function(err) {
                if (err) throw err;
            });
        }
        res.send(200);
    });

    app.get("/article/clear", function(req, res, next) {
        Article.collection.drop();  
        res.send(200);
    });


}
