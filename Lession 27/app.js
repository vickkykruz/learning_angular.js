(()=> {
    'use strict';

    angular.module('ShoppingListComponetApp', [])
    .controller('ShoppingListController1', ShoppingListController1)
    .controller('ShoppingListController2', ShoppingListController2)
    .factory('ShoppingListFactory', ShoppingListFactory)
    .directive('listItemDescription', ListItemDescription)
    .component('shoppingList', {
        templateUrl: 'list.html',
        controller: ShoppingListComponentController,
        bindings: {
            items: '<',
            myTitle: '@title',
            onRemove: '&'
        }
    });



    ShoppingListComponentController.$inject = ['$element']
    function ShoppingListComponentController($element) {
        let $ctrl = this;
        let totalItem;

        // Implemaentation of lifecycle component
        $ctrl.$onInit = ()=> {
            totalItem = 0;
        }

        $ctrl.cookiesList = ()=> {
            for (let i = 0; i < $ctrl.items.length; i++) {
                let itemName = $ctrl.items[i].name;
                
                if((itemName.toLowerCase().indexOf("cookies") !== -1) || (itemName.toLowerCase().indexOf("chips") !== -1)){
                    return true;
                }
            }

            return false;
        };

        $ctrl.remove = (myIndex)=> {
            $ctrl.onRemove({ index: myIndex})
        }

        

        $ctrl.$onChanges = (changeObj)=> {
            console.log("Changes: ",changeObj);
        }

        $ctrl.$doCheck = ()=> {
            if($ctrl.items.length !== totalItem){
                console.log("# of items changed. Checking for cookies or chips ");
                totalItem  = $ctrl.items.length;
                if($ctrl.cookiesList()) {
                    console.log("Oh, NO! COOKIES!!!!");
                    // Show Warning
                    let warningEle = $element.find('div.error');
                    warningEle.slideDown(900);
                }else{
                    // Hide Waring
                    console.log("No cookies here. Move right along");
                    let warningEle = $element.find('div.error');
                    warningEle.slideUp(900);
                }
            }
                
        }
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
        let list = this;

        // use the factory to create new shopping list service
        let shoppingList = ShoppingListFactory();

        list.items = shoppingList.getItems();
        
        // Here we defined the warning
        list.warning = "COOKIES DETECTED";
        
        // Decleare the variable title
        let originTitle = 'Shopping List #1';
        list.title = originTitle + " ( " + list.items.length + " items )";

        // Collecting the data from the user
        list.itemName = "";
        list.itemQuantity = "";

        // Fuction To Add Item
        list.addItem = ()=> {
            shoppingList.addItem(list.itemName, list.itemQuantity);
            list.title = originTitle + " ( " + list.items.length + " items )";
        }

        // Remove item
        list.removeItem = (itemIndex)=> {
            console.log('this is ', this);
            this.lastRemove = "Last item removed was " + this.items[itemIndex].name;
            shoppingList.removeItem(itemIndex);
            list.title = originTitle + " ( " + list.items.length + " items )";
        };

        // console.log(list1.items);
    }

    
    // Creating the function for ShoppingListController2
    ShoppingListController2.$inject = ['ShoppingListFactory'];

    function ShoppingListController2(ShoppingListFactory) {
        // Decleration
        let list = this;

         // use the factory to create new shopping list service
         let shoppingList = ShoppingListFactory(3);

         list.items = shoppingList.getItems();
 
         // Collecting the data from the user
         list.itemName = "";
         list.itemQuantity = "";
 
         // Fuction
         list.addItem = ()=> {
             try {
                    shoppingList.addItem(list.itemName, list.itemQuantity);
                }
             catch(error) {
                 list.errorMessage = error.message;
             }
         }
 
         // Remove item
         list.removeItem = (itemIndex)=> {
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