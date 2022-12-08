(()=> {
    'use strict';

    let shoppingList1 = [
        "Milk", "Dotun", "Cookies", "Chocolate", "Peanut","Butter", "Pepto", "Bismol", 
        "Banana", "Pepto Bismol (Chocolate Flavor)",
    ]

    let shoppingList2 = [
        {
            name: "Milk",
            quantity: "2",
        },

        {
            name: "Dotun",
            quantity: "200",
        },

        {
            name: "Cookies",
            quantity: "300",
        },

        {
            name: "Chocolate",
            quantity: "5",
        }
    ];
    
    angular.module('ShoppingListApp', [])
    .controller('ShoppingListController', ShoppingListController);

    ShoppingListController.$inject = ['$scope'];

    function ShoppingListController($scope) {
        $scope.shoppingLists1 = shoppingList1;
        $scope.shoppingList2 = shoppingList2;
        // console.log($scope.shoppingLists1);

        $scope.addItem = ()=> {
            let newwItem = {
                name: $scope.itemName,
                quantity: $scope.itemQuantity
            }

            $scope.shoppingList2.push(newwItem);
        }
    }
})();