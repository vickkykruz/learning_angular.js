(()=> {
    'use strict';

    angular.module('ShoppingListApp', [])
    .controller('ShoppingListController', ShoppingListController)
    .cutomService('cutomService', cutomService);

    function ShoppingListController() {
        let itemAdder = this;
        
        itemAdder.itemName = "";

        itemAdder.itemQuantity = ""

        itemAdder.addItem = ()=> {
            
        }
    }
})();