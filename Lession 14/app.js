(()=> {
    'use strict';

    angular.module('ControllerAsApp', [])
    .controller('ShoppingListController1', ShoppingListController1)
    .controller('ShoppingListController2', ShoppingListController2)
    .factory('ShoppingListFactory', ShoppingListFactory);

    // To inject the ShoppingListController1 with the factory
    ShoppingListController1.$inject = ['ShoppingListFactory'];

    // Create the function for ShoppingListController1
    function ShoppingListController1(ShoppingListFactory) {
        let list1 = this;

        // use the factory to create new shopping list service
        let shoppingList = ShoppingListFactory();

        list1.items = shoppingList.getItems(); 
        // [
        //     {name: "Rice",
        //     qunatity: "3 bags"
        // }
        // ];

        // Collecting the data from the user
        list1.itemName = "";
        list1.itemQuantity = "";

        // Fuction To Add Item
        list1.addItem = ()=> {
            shoppingList.addItem(list1.itemName, list1.itemQuantity);
        }

        // Remove item
        list1.removeItem = (itemIndex)=> {
            shoppingList.removeItem(itemIndex);
        };

        // console.log(list1.items);
    }

    
    // Creating the function for ShoppingListController2
    ShoppingListController2.$inject = ['ShoppingListFactory'];

    function ShoppingListController2(ShoppingListFactory) {
        // Decleration
        let list2 = this;

         // use the factory to create new shopping list service
         let shoppingList = ShoppingListFactory(3);

         list2.items = shoppingList.getItems();
 
         // Collecting the data from the user
         list2.itemName = "";
         list2.itemQuantity = "";
 
         // Fuction
         list2.addItem = ()=> {
             try {
                    shoppingList.addItem(list2.itemName, list2.itemQuantity);
                }
             catch(error) {
                 list2.errorMessage = error.message;
             }
         }
 
         // Remove item
         list2.removeItem = (itemIndex)=> {
             shoppingList.removeItem(itemIndex);
         }
    }

    // Create the Service => (if not specifed, maxItem is assumed unlimited)
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

    // To create the factory function
    function ShoppingListFactory() {
        let factory = (maxItem)=> {
            return new ShoppingListService(maxItem);
        }
        return factory;
    }
})();