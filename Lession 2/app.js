(function () {
    'use strict';

    // Defe Angular module
    angular.module('NameCalculator', [])
    
    // Define Controller
    .controller('NameCalculatorController', function($scope) {
        $scope.name = "";
        $scope.totalValue = 0; //get the totalvalue

        $scope.displayNumeric = function () {
            let totalNameValue = calculateNumericForString($scope.name);
            $scope.totalValue = totalNameValue;
        }

        function calculateNumericForString (string) {
            let totalStringValue = 0;
            for (let i = 0; i < string.length; i++) {
                totalStringValue += string.charCodeAt(i);                
            }

            return totalStringValue;
        }
    });
})();