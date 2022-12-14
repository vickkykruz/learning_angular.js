(()=> {
    'use strict';

    angular.module('TestingApp', [])
    .controller('TestingAppController', TestingAppController)
    .service('TestingAppService', TestingAppService)
    .service('TestingAppFilter', TestingAppFilter);

    TestingAppController.$inject = ['TestingAppService'];
    function TestingAppController(TestingAppService) {

        let testApp = this;

        // Collecting Data
        testApp.name = "Victor";
        testApp.username = "";
        testApp.email = "";
        testApp.password = "";

        testApp.register = ()=> {
            try{
                TestingAppService.register(testApp.name, testApp.username, testApp.email, testApp.password)
            }
            catch(errorResponse) {
                console.log();
            }
        }
    }

    TestingAppService.$inject = ['$http', '$q', 'TestingAppFilter'];
    function TestingAppService($http) {
        let service = this;

        service.register = (name, username, email, password)=> {
            
            let reponse = $http({
                method: "POST",
                url: "",
                params: {
                    save: 1,
                    name: name,
                    username: username,
                    email: email,
                    password: password
                }
            })
            return reponse;
        }
    }


})();