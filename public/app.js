var app = angular.module("myApp", ["ui.bootstrap", "myApp.filters", "myApp.directives"]);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "/view/partial/index",
            controller: "SearchController"
        }).
        when("/article/:id", {
            templateUrl: "partials/showArticle.html",
            controller: "ViewController"
        })
        .otherwise({
            redirectTo: "/"
        });

    $locationProvider.html5Mode(true);

});
