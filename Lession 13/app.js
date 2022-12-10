(()=> {
    'use strict';

    angular.module('ShoppingListApp', [])
    .controller('ShoppingListAddController', ShoppingListAddController)
    .controller('ShoppingListShowController', ShoppingListShowController)
    .service('cutomService', cutomService);

    // Inject the service
    ShoppingListAddController.$inject = ['cutomService'];
    function ShoppingListAddController(cutomService) {
        let itemAdder = this;
        
        itemAdder.itemName = "";

        itemAdder.itemQuantity = ""

        itemAdder.addItem = ()=> {
            cutomService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
        }
    }

    ShoppingListShowController.$inject = ['cutomService'];
    function ShoppingListShowController(cutomService){
        let showList = this;

        // Renove Item
        showList.removeItem = (itemIndex)=> {
            cutomService.removeItem(itemIndex);
        }
        showList.item = cutomService.getItems();
    }

    function cutomService() {
        let service = this;

        let items = [];

        // Service To Add Item
        service.addItem = (itemName, itemQuantity)=> {
            let item = {
                name: itemName,
                itemQuantity: itemQuantity
            }
            items.push(item);
        }

        // Service to remove item 
        service.removeItem = (itemIndex)=> {
            items.splice(itemIndex, 1);
        }

        // Fetch Items
        service.getItems = ()=> {
            return items;
        }


    }
})();