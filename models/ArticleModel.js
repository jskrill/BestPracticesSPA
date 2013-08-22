var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    articleSchema,
    Article;

articleSchema = Schema({
    title: String,
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }]
});

Article = mongoose.model("Article", articleSchema);

module.exports = Article;
