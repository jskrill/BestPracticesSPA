var path = require("path"),
    fs = require("fs");

module.exports = function(app, config) {
    app.get("/view/:view", function(req, res, next) {
        var view,
            filePath,
            e;
        view = req.param("view");
        filePath = path.join(config.templatePath, view) + ".html";
        fs.exists(filePath, function(exists) {
            if (exists) {
                res.sendfile(filePath);
            } else {
                e = new Error("View does not exist on filesystem");
                e.status = 400;
                next(e);
            }
        });
    });

    app.get("/view/partial/:partial", function(req, res, next) {
        var partial,
            filePath,
            e;
        partial = req.param("partial");
        filePath = path.join(config.templatePath + "/partial", partial) + ".html";
        fs.exists(filePath, function(exists) {
            if (exists) {
                res.sendfile(filePath);
            } else {
                e = new Error("Partial does not exist on filesystem");
                e.status = 400;
                next(e);
            }
        });
    });

}
