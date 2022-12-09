let nubmerArray = [1,2,3,4,5,6,7,8,9,10];
console.log(nubmerArray);

function above5(value){
    return value > 5;
}
let filtedNumber = nubmerArray.filter(above5)

console.log("Filtered Number" + filtedNumber)


// To Filter String
let shoppingList1 = [
    "Milk", "Dotun", "Cookies", "Chocolate", "Peanut","Butter", "Pepto", "Bismol", 
    "Banana", "Pepto Bismol (Chocolate Flavor)", "Pepto Bismol (Cookies Flavor)"
]

let searchValue = "Bismol";

function contentValue(value){
    return value.indexOf(searchValue) !== -1;
}

let searchedSoppingList = shoppingList1.filter(contentValue);
console.log(searchedSoppingList);
// ====================================
// Javascript Formanity

// Angular To filter search value
(()=> {
    'use strict';

    angular.module('SearchApp', [])
    .controller('SearchController', SearchController);

    SearchController.$inject = ['$scope'];

    function SearchController($scope) {
        $scope.shoppingList1 = shoppingList1;
    }
})();