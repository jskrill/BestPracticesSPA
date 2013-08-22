var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    postScheme,
    Post;

postSchema = Schema({
    message: String,
    upvotes: { type: Number, default: 0 },
    _article: { type: Schema.Types.ObjectId, ref: "Article" },
    _created: { type: Date, default: Date.now }
});

Post = mongoose.model("Post", postSchema);

module.exports = Post;
