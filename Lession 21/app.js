(()=> {
    'use strict';

    angular.module('DirectiveApp', [])
    .controller('ShoppingListController1', ShoppingListController1)
    .controller('ShoppingListController2', ShoppingListController2)
    .factory('ShoppingListFactory', ShoppingListFactory)
    .directive('listItemDescription', ListItemDescription)
    .directive('shoppingList', shoppingList);

    function shoppingList() {
        let ddo = {
            templateUrl: 'list.html',
            scope: {
                list: '=myList',
                title: '@title' //The implementation of title
            }
        }

        return ddo;
    }

    function ListItemDescription() {
        let ddo = {
            template: '{{ item.quantity }} of {{ item.name }}'
        }

        return ddo;
    }

    // To inject the ShoppingListController1 with the factory
    ShoppingListController1.$inject = ['ShoppingListFactory'];

    // Create the function for ShoppingListController1
    function ShoppingListController1(ShoppingListFactory) {
        let list1 = this;

        // use the factory to create new shopping list service
        let shoppingList = ShoppingListFactory();

        list1.items = shoppingList.getItems(); 
        
        // Decleare the variable title
        let originTitle = 'Shopping List #1';
        list1.title = originTitle + " ( " + list1.items.length + " items )";

        // Collecting the data from the user
        list1.itemName = "";
        list1.itemQuantity = "";

        // Fuction To Add Item
        list1.addItem = ()=> {
            shoppingList.addItem(list1.itemName, list1.itemQuantity);
            list1.title = originTitle + " ( " + list1.items.length + " items )";
        }

        // Remove item
        list1.removeItem = (itemIndex)=> {
            shoppingList.removeItem(itemIndex);
            list1.title = originTitle + " ( " + list1.items.length + " items )";
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