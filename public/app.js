var app = angular.module("myApp", ["myApp.filters", "myApp.directives"]);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "/view/partial/index",
            controller: "SearchController"
        })
        .otherwise({
            redirectTo: "/"
        });

    $locationProvider.html5Mode(true);

});
