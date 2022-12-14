(()=> {
    'use strict';

    angular.module('MenuCategoriesApp', [])
    .controller('MenuCategoriesController', MenuCategoriesController)
    .service('MenuCategoriesService', MenuCategoriesService)
    // Register the .constant with the module
    .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

    MenuCategoriesController.$inject = ['MenuCategoriesService'];

    function MenuCategoriesController(MenuCategoriesService) {

        let menu = this;

        let promise = MenuCategoriesService.getMenuCategories();

        promise
        .then((response)=> {
            menu.categories = response.data;
        })
        .catch((errorResponse)=> {
            console.log(errorResponse);
            // console.log("Something Terrible Went Wrong")
        })

        // For the item
        menu.logMenuItems = (shortName)=> {
            let promise = MenuCategoriesService.getMenuCategories(shortName);

            promise
            .then((response)=> {
                console.log(response.data);
            })
            .catch((errorResponse)=> {
                console.log(errorResponse);
            })
        }

    }

    MenuCategoriesService.$inject = ['$http', 'ApiBasePath']
    function MenuCategoriesService($http, ApiBasePath) {
        let service = this;

        service.getMenuCategories = ()=> {
            let response = $http({
                method: "GET",
                url: (ApiBasePath + "/categories.json") // "Note: to create a constany domain name such as (http://davids-restaurant.herokuapp.com) it is advise to use the .constant key "
            });

            return response;
        }

        service.getMenuCategories = (shortName)=> {
            let response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_item.json"),
                params: {
                    category: shortName
                }
            });

            return response;
        }
    }
})();