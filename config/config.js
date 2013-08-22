var path = require("path"),
    _ = require("underscore"),
    rootPath = path.normalize(__dirname + "/.."),
    templatePath =  path.normalize(__dirname + "/../views");

var staticConfig = {
    "app": {
        "name": "BestPractices"
    },
    "rootPath": rootPath,
    "templatePath": templatePath
}

module.exports = {
    "test": _.defaults({
        "db": "mongodb://localhost/BestPractices_test",
        "env": "test"
    },staticConfig),
    "developement": _.defaults({
        "db": "mongodb://localhost/BestPractices_dev",
        "env": "developement"
    },staticConfig),
    "production": _.defaults({
        "db": "mongodb://localhost/BestPractices_prod",
        "env": "production"
    },staticConfig)
}
