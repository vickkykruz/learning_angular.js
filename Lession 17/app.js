(()=> {
    'use strict';

    angular.module('ShoppingListPromiseApp', [])
    .controller('ShoppingListController', ShoppingListController)
    .service('ShoppingListService', ShoppingListService)
    .service('WeightLossFilterService', WeightLossFilterService);  // We register thr config with the module
    
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
                // list.errorMessage = ShoppingListService.errorMessage;
                // console.log(list.errorMessage);
                // list.errorMessage = error.message;
            }
        }

        // Remove Item
        list.removeItem = (itemIndex)=> {
            ShoppingListService.removeItem(itemIndex);
        }
    }

    ShoppingListService.$inject = ['$q', 'WeightLossFilterService']
    function ShoppingListService($q, WeightLossFilterService) {
        // Declearartion
        let service = this;

        let items = [];

        // service.addItem = (itemName, itemQuantity)=> {
        //     // Here is the aynsyc behaionur
        //     let promise = WeightLossFilterService.checkName(itemName);

        //     promise.then((response)=> {
        //         let nextPromise = WeightLossFilterService.checkQuantity(itemQuantity);

        //         nextPromise.then((result)=> {
        //             let item = {
        //                 name: itemName,
        //                 quantity: itemQuantity
        //             };
        //             items.push(item);
        //         }, (errorResponse)=> {
        //             // service.errorMessage = errorResponse.message;
        //             console.log(errorResponse.message);
        //             // throw new Error(errorResponse.message);
        //         });
        //     }, (errorResponse)=> {
        //         // service.errorMessage = errorResponse.message;
        //         // throw new Error(errorResponse.message);
        //         console.log(errorResponse.message);
        //     });
            
        // };

        // service.addItem = (itemName, itemQuantity)=> {
        //     let promise = WeightLossFilterService.checkName(itemName);

        //     promise
        //     .then((response)=> {
        //         return WeightLossFilterService.checkQuantity(itemQuantity);
        //     })
        //     .then((response)=> {
        //         let item = {
        //             name: itemName,
        //             quantity: itemQuantity
        //         };
        //         items.push(item);
        //     })
        //     .catch((errorResponse)=> {
        //         console.log(errorResponse.message);
        //         // service.errorMessage(errorResponse.message);
        //     })
        // }

        service.addItem = (itemName, itemQuantity)=> {
            let namePromise = WeightLossFilterService.checkName(itemName);
            let quantityPromise = WeightLossFilterService.checkQuantity(itemQuantity);

            $q.all([namePromise, quantityPromise])
            .then((response)=> {
                let item = {
                    name: itemName,
                    quantity: itemQuantity
                };
                items.push(item);
            })
            .catch((errorResponse)=> {
                // service.errorMessage = Error(errorResponse.message); 
                console.log(errorResponse.message);
            })
        }

        // RRemove Item
        service.removeItem = (itemIndex)=> {
            items.splice(itemIndex, 1);
        }

        service.getItems = ()=> {
            return items;
        };
    }

    // This is the aynsyc function
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