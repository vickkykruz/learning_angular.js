(() => { 
    'use strict';

    angular.module('CounterApp', [])
    .controller('CounterController', CounterController);

    CounterController.$inject = ['$scope', '$timeout'];
    function CounterController ($scope, $timeout) {
        $scope.counter = 0;

        // $timeout is a native in angular js  
        $scope.upCounter = ()=> {
            $timeout(()=> {
                $scope.counter++;
                console.log("Counter Increamented by "+ $scope.counter);
            }, 2000);
        }

        // Better way of do this
        // $scope.upCounter = ()=> {
        //     setTimeout(() => {
        //         $scope.$apply(()=> {
        //             $scope.counter++;
        //             console.log("Counter Increamented by "+ $scope.counter);
        //         })
        //     }, 2000);
        // }
        // Bad Pratices => But dis can be doneif there is an erorr in the application
        // $scope.upCounter = ()=> {
        //     // To Operate with setTimer
        //     setTimeout(() => {
        //         $scope.counter++;
        //         $scope.$digest();
        //         console.log('Counter Incramented');    
        //     }, 2000);
            
        // }

    }
})();