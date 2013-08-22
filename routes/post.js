var mongoose = require("mongoose"),
    Article,
    Post;

module.exports = function(app, config) {
    Article = require(config.rootPath + "/models/ArticleModel");
    Post = require(config.rootPath + "/models/PostModel");

    //CRUD
    app.post("/post/create/:articleId", function(req, res, next) {
        var articleId = req.param("articleId"),
            post,
            message = req.body.message;
        if (message) {
            Article.findById(articleId, function(err, articleDoc) {
                if (err) {
                    next(err);
                }
                post = new Post({message: message, _creator: articleId});
                post.save();
                articleDoc.posts.push(post._id);
                articleDoc.save();
                res.send(200);
            });
        } else {
            e = new Error("Post message was not supplied for creation"); 
            e.status = 500;
            next(e);
        }
    });

    app.put("/post/update/:id", function(req, res, next) {
        var id = req.param("id"),
            post,
            message = req.body.message;
        if (message) {
            Post.findById(id, function(err, doc) {
                if (err) {
                    next(err);
                }
                doc.message = message;
                doc.save();
                res.json(doc);
            });
        } else {
            e = new Error("Post message was not supplied for update"); 
            e.status = 500;
            next(e);
        }
    });

    app.get("/post/read/:id", function(req, res, next) {
        var id = req.param("id");
        Post.findById(id, function (err, doc) {
            res.json(doc);
        });
    });

    app.delete("/post/destroy/:id", function(req, res, next) {
        var id = req.param("id");
        Post.findById(id, function (err, doc) {
            if (err) {
                next(err);
            }
            doc.remove();
            res.send(200);
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

}
