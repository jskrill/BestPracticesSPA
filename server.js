var express = require("express"),
    _ = require("underscore"),
    fs = require("fs"),
    app = express();
    env = process.env.NODE_ENV || "developement",
    port = process.env.PORT || 3000,
    config = require("./config/config")[env],


require("./config/middleware")(app, config);

_.each(fs.readdirSync("./routes"), function(route) {
    if (~route.indexOf(".js")){
        require("./routes/" + route)(app, config);
    }
});


app.listen(port);
console.log("Server running on " + port);
