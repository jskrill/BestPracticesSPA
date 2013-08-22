module.exports = {
    "test": function(err, req, res, next) {
        err.message = err.message || "Interval Server Error";
        err.status = err.status || 500;
        res.json(err.status, {"error": err.message});
    },
    "developement": function(err, req, res, next) {
        err.message = err.message || "Interval Server Error";
        err.status = err.status || 500;
        console.error(err.stack);
        res.json(err.status, {"error": err.message});
    },
    "production": function(err, req, res, next) {
        err.message = err.message || "Interval Server Error";
        err.status = err.status || 500;
        res.json(err.status, {"error": err.message});
    }
}
