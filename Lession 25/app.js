(()=> {
    'use strict';

    angular.module('DirectiveApp', [])
    .controller('ShoppingListController1', ShoppingListController1)
    .controller('ShoppingListController2', ShoppingListController2)
    .controller('ShoppingListDirectiveController', ShoppingListDirectiveController) // Register the directive controller inside the module
    .factory('ShoppingListFactory', ShoppingListFactory)
    .directive('listItemDescription', ListItemDescription)
    .directive('shoppingList', shoppingListDirective);

    function shoppingListDirective() {
        let ddo = {
            templateUrl: 'list.html',
            scope: {
                items: '<',
                title: '@', //The implementation of title
                // badRemove: '=',
                onRemove: '&'
            },
            // controller: ShoppingListDirectiveController,
            // controllerAs: 'list',
             // Another way to do this, is to register it with module.
             controller: 'ShoppingListDirectiveController as list',
            bindToController: true,
            link: ShoppingListDirectiveLink,
            transclude: true
        }

        return ddo;
    }

    function ShoppingListDirectiveLink(scope, element, attrs, controller) {
        console.log("Links scope is: ", scope);
        console.log("Link element is: ", element);
        console.log("Controller instant is: ", controller);

        scope.$watch('list.cookiesList()', (oldValue, newValue)=> {
            console.log('oldValue ', oldValue);
            console.log('newValue ', newValue);

            
            if(oldValue === true){
                displayCookiesWarning();
            }else{
                removeCookiesWarning();
            }
        });

        function displayCookiesWarning() {
            // Use Angular JqLite to improve the Css Funationality
            // Documentation => Search For "angularjs jqlite" for all the elements and this provide a lot of JQuery methods..
            // let warningEle = element.find("div");
            // console.log(warningEle)
            // warningEle.css('display', 'block');

            // If Jquery is included before Angular
            let warningEle = element.find("div.error");
            warningEle.slideDown(900);
        }
    
        
        function removeCookiesWarning() {
            // Use Angular JqLite
            // let warningEle = element.find("div");
            // warningEle.css('display', 'none');

            let warningEle = element.find("div.error");
            warningEle.slideUp(900);
        }

    }



    function ShoppingListDirectiveController() {
        let list = this;

        list.cookiesList = ()=> {
            for (let i = 0; i < list.items.length; i++) {
                let itemName = list.items[i].name;
                
                if((itemName.toLowerCase().indexOf("cookies") !== -1) || (itemName.toLowerCase().indexOf("chips") !== -1)){
                    return true;
                }
            }

            return false;
        };
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