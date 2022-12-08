(() => { 
    'use strict';

    angular.module('CounterApp', [])
    .controller('CounterController', CounterController);

    CounterController.$inject = ['$scope'];
    function CounterController ($scope) {
        $scope.onceCounter = 0;
        $scope.counter = 0;
        $scope.name = "Victor Chukwemeka"
        $scope.showNumberOfWatches = function () {
            console.log("# of watches", $scope.$$watchersCount);
        }

        $scope.countOnce = function () {
            $scope.onceCounter = 1;
        };

        $scope.upCounter = ()=> {
            $scope.counter++;
        }

        $scope.$watch(()=> {
            console.log('Digest Loop Fired');
        })
        // To develop a manual watch
        // $scope.$watch('onceCounter', (newValue, oldValue) => {
        //     console.log('onceCounter old version', oldValue);
        //     console.log('onceCounter new version', newValue);
        // })

        // $scope.$watch('counter', (newValue, oldValue) => {
        //     console.log('Couter old version', oldValue);
        //     console.log('Counter new version', newValue);
        // })
    }
})();