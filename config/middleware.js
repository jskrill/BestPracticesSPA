var express = require("express"),
    winston = require("winston"),
    expressWinston = require("express-winston");

module.exports = function(app, config) {
    app.use(express.favicon());
    app.use(express.static(config.rootPath + "/public"));
    app.configure(function () {
        app.use(express.cookieParser());
        app.use(express.bodyParser());
        app.use(express.session({
            secret: "BPSECRET",
        }));
        app.use(expressWinston.logger({
            transports: [
                new winston.transports.File({
                    colorize: true,
                    filename: config.rootPath + "/logs/req-log-" + config.env 
                })
            ]
        }));
        app.use(app.router);
        app.use(expressWinston.errorLogger({
            transports: [
                new winston.transports.File({
                    colorize: true,
                    filename: config.rootPath + "/logs/error-log-" + config.env 
                })
            ]
        }));
    });
}
