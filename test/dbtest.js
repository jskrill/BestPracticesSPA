var should = require("should"),
    assert = require("assert"),
    request = require("supertest"),
    url = "http://localhost:3000",
    mongoose = require("mongoose"),
    config = require("../config/config")["test"],
    conn = mongoose.connect(config.db);


//Article REST testing
describe("Article", function() {
    var articleId;

    describe("POST /article/create", function() {
        it("should respond with json of the newly created article", function(done) {
            request(url)
                .post("/article/create")
                .set("Content-Type", "application/json")
                .send({"title": "test"})
                .expect("Content-Type", /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    
                    res.body.should.have.property("_id");
                    res.body.title.should.equal("test");
                    res.body.posts.should.not.equal(null);
                    articleId = res.body._id;
                    done();
                });
        });
    });


    describe("PUT /article/update", function() {
        it("should respond with json of updated article", function(done) {
            request(url)
                .put("/article/update")
                .set("Content-Type", "application/json")
                .send({"_id": articleId, "title": "testupdate"})
                .expect("Content-Type", /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    
                    res.body.should.have.property("_id");
                    res.body.title.should.equal("testupdate");
                    res.body.posts.should.not.equal(null);
                    done();
                });
        });
    });

    describe("GET /article/read/:id", function() {
        it("should respond with json of article", function(done) {
            request(url)
                .get("/article/read/" + articleId)
                .expect("Content-Type", /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.should.have.property("_id");
                    res.body.should.have.property("title");
                    res.body.should.have.property("posts");
                    res.body.title.should.not.equal(null);
                    res.body.posts.should.not.equal(null);
                    done();
                });
        });
    });

    describe("DELETE /article/destroy/:id", function() {
        it("should respond with 200", function(done) {
            request(url)
                .del("/article/destroy/" + articleId)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    request(url)
                        .get("/article/read/" + articleId)
                        .expect(404)
                        .end(function(err, res) {
                            done();
                        });
                });
        });
    });


});

//Post REST testing
describe("Post", function() {
    var articleId,
        postId;
    before(function(done) {
        request(url)
            .post("/article/create")
            .set("Content-Type", "application/json")
            .send({"title": "test"})
            .expect("Content-Type", /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                articleId = res.body._id;
                done();
            });
    });

    after(function(done) {
        request(url)
            .del("/article/destroy/" + articleId)
            .end(function(err) {
                if (err) throw err;
                request(url)
                    .del("/post/destroy/" + postId)
                    .end(function(err) {
                        if (err) throw err;
                        done();
                    });
            });
    });


    describe("POST /post/create", function(){
        it("should return the newly created post as json", function(done){
            request(url)
                .post("/post/create")
                .set("Content-Type", "application/json")
                .send({"_article": articleId, "message": "testMessage1"})
                .expect("Content-Type", /json/)
                .expect(200)
                .end(function(err, resPost){
                    if (err) throw err;
                    request(url)
                        .get("/article/read/" + articleId)
                        .end(function(err, resArticle) {
                            if (err) {
                                throw err;
                            }
                            resPost.body.should.have.property("_id");
                            resPost.body.should.have.property("_article");
                            resPost.body.upvotes.should.equal(0);
                            resPost.body.message.should.equal("testMessage1");
                            resPost.body._article.should.equal(articleId);
                            resArticle.body.posts.length.should.equal(1);
                            resArticle.body.posts[0].should.equal(resPost.body._id);
                            postId = resPost.body._id; 
                            done();
                        });
                });
        });

    });

    describe("PUT /post/update", function(){
        it("should update the post and return it as json", function(done){
            request(url)
                .put("/post/update")
                .send({"_id": postId, "message": "testMessage2"})
                .expect("Content-Type", /json/)
                .expect(200)
                .end(function(err, res){
                    if (err) throw err;
                    res.body.should.have.property("_id");
                    res.body.message.should.equal("testMessage2");
                    res.body._article.should.equal(articleId);
                    done();
                });
        });

    });

    describe("GET /post/read/:id", function(){
        it("should return the post as json", function(done){
            request(url)
                .get("/post/read/" + postId)
                .expect("Content-Type", /json/)
                .expect(200)
                .end(function(err, res){
                    if (err) throw err;
                    res.body.should.have.property("_id");
                    res.body.should.have.property("_article");
                    res.body.should.have.property("message");
                    done();
                });
        });
    });

    describe("DELETE /post/destroy/:id", function(){
        it("should delete the post and return 200", function(done){
            request(url)
                .del("/post/destroy/" + postId)
                .expect(200)
                .end(function(err, res){
                    if (err) throw err;
                    request(url)
                        .get("/post/read/" + postId)
                        .expect(404)
                        .end(function(err, res) {
                            done();
                        });
                });
        });
    });

});
