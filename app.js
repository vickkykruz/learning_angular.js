// First Class => Induction to Angular Js

// The first to start is an epy
// ()(); => Ifey

// Best Practices
// An that is declearing our functions with 'use strict' to protect us from make mistakes
// 'use strict'

// Example
// x = "hello";

// To decllear it =>
// (function () {
    // To start our angular Js function onour apps
    // angular.module('<name of App>', ['dependcies']) => First Step
    // angular.module('myFirstApp', [])

        // .controller('myFirstController', function(){ //This function is a way we define the view module  being (index.html)

    // }) // This take two this ### <name of the controller and ### function that define the functionality
// })();

// Second Class => Use of Controllers

(function() {

    'use strict';

    angular.module('myFirstApp', [])
    .controller('myFirstController', function($scope) {
        $scope.name = "Victor Chukwuemeka";
        // For function
        $scope.sayHello = function(){
            return "Hello, I'm happy to learn Angular Js";
        };
    });
})();