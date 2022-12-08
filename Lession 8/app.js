(()=> {
    'use strict';

    angular.module('BlindingApp', [])
    .controller('BlindingController', BlindingController);

    BlindingController.$inject = ['$scope'];
    function BlindingController($scope) {
        $scope.firstName = "Victor";
        $scope.lastName = "Chukkwuemeka";
        $scope.surName = "Onwuegbuchulem";
        // $scope.fullName = "";
        // For the watches
        $scope.showNumberOfWatchers = ()=> {
            console.log($scope.$$watchersCount);
        }

        // !-time Blinding
        $scope.setFullName = ()=> {
            $scope.fullName = $scope.surName + " " + $scope.firstName + " " + $scope.lastName;
        }

        
        $scope.logSurName = ()=> {
            console.log("Surname is : " + $scope.surName);
        }

        $scope.logFirstName = ()=> {
            console.log("First Name: " + $scope.firstName);
        }

        
        $scope.logLastName = ()=> {
            console.log("Last Name: " + $scope.lastName);
        }

        
        $scope.logFullName = ()=> {
            console.log("Full Name: " + $scope.fullName);
        }
        
    }
})();