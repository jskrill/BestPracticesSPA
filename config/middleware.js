var errorHandler,
    express = require("express");

module.exports = function(app, config) {
    errorHandler = require("./errorHandler"); 
    app.use(express.favicon());
    app.use(express.static(config.rootPath + "/public"));
    app.configure(function () {
        app.use(express.cookieParser());
        app.use(express.bodyParser());
        app.use(express.session({
            secret: "BPSECRET",
        }));
        app.use(app.router);
        app.use(errorHandler);
    });
}
