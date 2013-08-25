app.factory("apiService", ["$q", "$http", function($q, $http) {
    return {
        getAllArticles: function(callback) {
            return $http.get("/article/all").success(callback);
        }
    }
}]);
