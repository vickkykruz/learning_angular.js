(()=> {
    'use strict';

    angular.module('ShoppingListEventApp', [])
    .controller('ShoppingListController1', ShoppingListController1)
    .factory('ShoppingListFactory', ShoppingListFactory)
    .service('WeightLossFilterService', WeightLossFilterService)
    .directive('listItemDescription', ListItemDescription)
    .component('shoppingList', {
        templateUrl: 'list.html',
        controller: ShoppingListComponentController,
        bindings: {
            items: '<',
            myTitle: '@title',
            onRemove: '&'
        }
    })
    .component('loadingSpainer', {
        templateUrl: 'spainner.html',
        controller: SpainerController,
    });

    SpainerController.$inject = ['$rootScope'];
    function SpainerController($rootScope) {
        let $ctrl = this;

        let cancelLister = $rootScope.$on('shoppinglist:processing', (event, data)=> {
            console.log("Event: ", event);
            console.log("Data: ", data);

            if (data.on) {
                $ctrl.showSpainer = true;
            } else {
                $ctrl.showSpainer = false;
            }
        });

        $ctrl.$onDestroy = ()=> {
            cancelLister();
        }
    }



    ShoppingListComponentController.$inject = ['$rootScope', '$element', '$q', 'WeightLossFilterService'];
    function ShoppingListComponentController($rootScope,$element, $q, WeightLossFilterService) {
        let $ctrl = this;
        let totalItem;

        // Implemaentation of lifecycle component
        $ctrl.$onInit = ()=> {
            totalItem = 0;
        }

        $ctrl.$doCheck = ()=> {
            if($ctrl.items.length !== totalItem){
                totalItem  = $ctrl.items.length;

                $rootScope.$broadcast('shoppinglist:processing', {on: true});
                let promises = [];

                for (let i = 0; i < $ctrl.items.length; i++) {
                    promises.push(WeightLossFilterService.checkName($ctrl.items[i].name));
                }

                $q.all(promises)
                .then((result)=> {
                    // Hide Waring
                    let warningEle = $element.find('div.error');
                    warningEle.slideUp(900);
                })
                .catch((errorRespond)=> {
                    // Show Warning
                    let warningEle = $element.find('div.error');
                    warningEle.slideDown(900);
                })
                .finally(()=> {
                    $rootScope.$broadcast('shoppinglist:processing', {on: false});
                })
                
                
            }
                
        }

        
        $ctrl.remove = (myIndex)=> {
            $ctrl.onRemove({ index: myIndex})
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

    WeightLossFilterService.$inject = ['$q', '$timeout'];
    function WeightLossFilterService($q, $timeout){

        let service = this;

        service.checkName = (itemName)=> {
            let deferred = $q.defer();

            let result = {
                message: ""
            };

            $timeout(()=> {
                if(itemName.toLowerCase().indexOf('cookie')  === -1){
                    deferred.resolve(result);
                }else{
                    result.message = "Stay away from cookies, Victor";
                    deferred.reject(result);
                }
            }, 3000)
            return deferred.promise;
        }

        service.checkQuantity = (itemQuantity)=> {
            let deferred = $q.defer();

            let result = {
                message: ""
            };

            $timeout(()=> {
                if(itemQuantity < 4){
                    deferred.resolve(result);
                }else{
                    result.message = "That's too much, Victor";
                    deferred.reject(result);
                }
            }, 3000)
            return deferred.promise;
        }
    }
})();