var mongoose = require("mongoose"),
    _ = require("underscore"),
    Article,
    Post;

module.exports = function(app, config) {
    Article = require(config.rootPath + "/models/ArticleModel");
    Post = require(config.rootPath + "/models/PostModel");

    //CRUD
    app.post("/post/create", function(req, res, next) {
        var data = req.body,
            _article = data._article,
            post;
        if (_article) {
            Article.findById(_article, function(err, articleDoc) {
                if (err) {
                    next(err);
                }
                post = new Post(data);
                post.save(function(err, savedPost) {
                    if (err) {
                        next(err);
                    }
                    articleDoc.posts.push(savedPost._id);
                    articleDoc.save(function(err, savedArticle) {
                        if (err) {
                            next(err);
                        }
                        res.json(savedPost);
                    });
                });
            });
        } else {
            e = new Error("_article (article id) was not supplied"); 
            e.status = 500;
            next(e);
        }
    });

    app.put("/post/update", function(req, res, next) {
        var data = req.body,
            _id = data._id;

        if (_id){
            Post.findById(_id, function(err, doc) {
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
            e = new Error("Post _id was node supplied"); 
            e.status = 500;
            next(e);
        }
    });

    app.get("/post/read/:id", function(req, res, next) {
        var _id = req.param("id");
        Post.findById(_id, function (err, doc) {
            if (err) {
                next(err);
            }
            res.json(doc);
        });
    });

    app.delete("/post/destroy/:id", function(req, res, next) {
        var _id = req.param("id");
        Post.findById(_id, function (err, doc) {
            if (err) {
                next(err);
            }
            doc.remove(function(err){
                if (err) {
                    next(err);
                }
                res.send(200);
            });
        });
    });

    //PRACTICAL
    app.get("/post/all/:articleId", function(req, res, next) {
        var articleId = req.param("articleId");
        Article.findById(articleId).
        populate("posts").
        exec(function(err, doc) {
            if (err) {
                next(err);
            }
            res.json(doc.posts);
        });
    });

    app.get("/post/clear", function(req, res, next) {
        Post.collection.drop();
        res.send(200);
    });

}
