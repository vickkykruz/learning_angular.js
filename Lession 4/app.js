// (function () {
//     'use strict';

//     angular.module('DIApp', [])

//     // .controller('DIController', ['$scope', '$filter', DIController]);

//     //  Another Way
//     .controller('DIController', DIController);

//     DIController.$inject = ['$scope', '$filter'];
//     // $filter service is the serivce that let us create filteing function that are use for formatting the data that display
//     // $injector serice give us the function agreement invoice
//     // Website => javascript-minifier.com :: This site minifty any Js code  
//     function DIController ($scope, $filter){
//         $scope.name = ""; // I want he user to enter this name

//         $scope.upper = function () {
//             let upCase = $filter('uppercase');
//             $scope.name = upCase($scope.name);
//         }

//     }
// })();

!function(){"use strict";function e(e,n){e.name="",e.upper=function(){let t=n("uppercase");e.name=t(e.name)}}angular.module("DIApp",[]).controller("DIController",e),e.$inject=["$scope","$filter"]}();