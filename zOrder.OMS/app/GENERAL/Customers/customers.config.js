zk_modules.push('Customers');

(function () {
    angular
        .module('Customers')
        .config(CustomersConfig);

    function CustomersConfig($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('Customers', {
                url: '/Customers',
                views: {
                    '': {
                        templateUrl: 'GENERAL/Customers/customers.html',
                        controller: 'CustomersController',
                        controllerAs: 'vm'
                    }
                },
                data: {

                }
            });
            
    }
})();

