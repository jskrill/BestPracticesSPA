var path = require("path");

module.exports = function(app, config) {
    app.get("/", function(req, res, next) {
        var view,
            filePath,
            e;
        view = req.param("view");
        filePath = path.join(config.templatePath, "default.html");
        res.sendfile(filePath);
    });
}
