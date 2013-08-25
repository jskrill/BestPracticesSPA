function SearchController($scope, $http, $filter, apiService) {
    function updateData() {
        console.log("Updating");
        var articles = $scope.articles;
        articles = $filter("orderBy")(articles, "title");
        articles = $filter("startsWith")(articles, {"title": $scope.articleInput}, true);
        $scope.page = 1;
        $scope.filteredArticles = articles;
        if (articles.length) {
            $scope.pages = Math.ceil(articles.length / $scope.limit);
        }
    }
    
    $scope.articleInput = "";
    $scope.page = 1;
    $scope.pages = 0;
    $scope.limit = 10;
    $scope.skipNum = 0;
    $scope.articles = [];
    apiService.getAllArticles(function(data) {
        $scope.articles = data;
        updateData();
    });
    $scope.$watch("articleInput", updateData);
    $scope.$watch("page", function() {
        $scope.skipNum = ($scope.page - 1) * $scope.limit;
    });
}
