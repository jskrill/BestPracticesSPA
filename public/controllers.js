function SearchController($scope, $http) {
    var limit = 5,
        page = 1;

    function init(count) {
        console.log("Init");
        $scope.count = count;
        $scope.limit = limit;
        $scope.pages = Math.ceil(count / limit);
        $scope.page = page;
    }

    $http.get("/article/count").success(function(data) {
        init(data.count);
        $scope.changePage = function(ipage) {
            $http.get("/article/pagination?page=" + ipage + "&limit=" + limit)
                .success(function(data) {
                    $scope.articles = data;
                    console.log($scope.articles);
                });
        }

        $scope.changePage(page);
    });
}
