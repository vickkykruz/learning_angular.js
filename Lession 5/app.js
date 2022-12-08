(function () {
    'use strict';

    angular.module('MsgApp', [])

    .controller('MsgController', MsgController)
    .filter('custom', LoveFilter)
    .filter('truth', TruthFilter);

    // Declaer the filter method
    MsgController.$inject = ['$scope', '$filter', 'customFilter', 'truthFilter']; // This is protect the application from modification

    function MsgController($scope, $filter,  customFilter) {
        $scope.name = "Victor Chukwuemeka";
        $scope.stateOfBeing = "html5";

        $scope.feedVictor = function () {
            $scope.stateOfBeing = "php";
        }

        $scope.cookieCost = .55;

        // Usin filter method
        $scope.sayMessage = function () {
            let msg = "Victor like to eat snacks at night";

            msg = $filter('uppercase')(msg);

            return msg;
        }

        $scope.sayLovesMessage = function () {
            let msgs = "Victor like to eat snacks at night";

            msgs = customFilter(msgs)

            return msgs;
        }
    }

    // Crating a custom filter
    function LoveFilter() {
        return function (input){
            input = input || "";
            input = input.replace("like", "love");
            return input;
        }
    }

    // Crating a custom filter with arguments
    function TruthFilter () {
        return function (input, target, replace){
            input = input || "";
            input = input.replace(target, replace);
            return input;
        }
    }
})();