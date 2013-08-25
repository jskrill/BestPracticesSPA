angular.module("myApp.directives", []).directive("extendToBottom", [function() {
    return {
        link: function(scope, element) {
            scope.$watch(
                function() { return element[0].getBoundingClientRect().top },
                function() {
                    var rect = element[0].getBoundingClientRect(),
                        top = rect.top,
                        windowHeight = $(window).height();
                    console.log(rect, top, windowHeight);
                    element.css("height", (windowHeight - top) + "px");
                });
        }
    }
}]).directive("keepfocus", ["$timeout", function($timeout) {
    return {
        restrict: "A",
        link: function(scope, element, attr) {
            $timeout(function setFocus() {
                if (!element.is(":focus")){
                    element.focus();
                }
                $timeout(setFocus, 0, false);
            }, 0, false);
        }

    }
}]);
