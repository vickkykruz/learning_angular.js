(function () {
    'use strict';

    angular.module('MsgApp', [])

    .controller('MsgController', MsgController);

    MsgController.$inject = ['$scope']; // This is protect the application from modification

    function MsgController($scope) {
        $scope.name = "Victor Chukwuemeka";
        $scope.stateOfBeing = "html5";

        $scope.feedVictor = function () {
            $scope.stateOfBeing = "php";
        }

        $scope.sayMessage = function () {
            return "Victor like to eat snacks at night";
        }
    }
})();