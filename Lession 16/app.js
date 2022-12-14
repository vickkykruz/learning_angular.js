(()=> {
    'use strict';

    angular.module('ShoppingListApp', [])
    .controller('ShoppingListController', ShoppingListController)
    .provider('ShoppingListService', ShoppingListServiceProvider)
    .config(Config);  // We register thr config with the module
    
    // Inject it with the prodiver function
    Config.$inject = ['ShoppingListServiceProvider'];

    // The function
    function Config(ShoppingListServiceProvider) {
        ShoppingListServiceProvider.defaults.maxItem = 2;
    }

    ShoppingListController.$inject = ['ShoppingListService'];

    function ShoppingListController(ShoppingListService) {
        // Decleration
        let list = this;

        // Display Items
        list.items = ShoppingListService.getItems();

        // Collect the info
        list.itemName = "";
        list.itemQuantity = "";

        // Add item Fuction
        list.addItem = ()=> {
            try{
                ShoppingListService.addItem(list.itemName, list.itemQuantity);
            }
            catch(error){
                list.errorMessage = error.message;
            }
        }

        // Remove Item
        list.removeItem = (itemIndex)=> {
            ShoppingListService.removeItem(itemIndex);
        }
    }

    function ShoppingListService(maxItem) {
        // Declearartion
        let service = this;

        let items = [];

        service.addItem = (itemName, itemQuantity)=> {
            if ((maxItem === undefined) || (maxItem !== undefined) && (items.length < maxItem)){
                let item = {
                    name: itemName,
                    quantity: itemQuantity
                };
                items.push(item);
            }else{
                throw new Error("Max items (" + maxItem + ") reached");
            }
        };

        // RRemove Item
        service.removeItem = (itemIndex)=> {
            items.splice(itemIndex, 1);
        }

        service.getItems = ()=> {
            return items;
        };
    }

    function ShoppingListServiceProvider() {
        let provide = this;

        provide.defaults = {
            maxItem: 10
        }

        provide.$get = ()=> {
            let shoppingList = new  ShoppingListService(provide.defaults.maxItem);

            return shoppingList;
        }
    }
})();