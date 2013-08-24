var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    articleSchema,
    Article;

articleSchema = Schema({
    title: { type: String, unique: true, required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }]
});

Article = mongoose.model("Article", articleSchema);

module.exports = Article;
