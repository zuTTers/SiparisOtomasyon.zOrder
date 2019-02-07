zk_modules.push('Products');

(function () {
    angular
        .module('Products')
        .config(ProductsConfig);

    function ProductsConfig($urlRouterProvider, $stateProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('Products', {
                url: '/Products',
                views: {
                    '': {
                        templateUrl: 'GENERAL/Products/products.html',
                        controller: 'ProductsController',
                        controllerAs: 'vm'
                    }
                    ,
                    'ProductsDialog': {
                        templateUrl: 'GENERAL/Products/products.dialog.html',
                        controller: 'ProductsDialogController',
                        controllerAs: 'vm'
                    }
                },
                data: {

                }
            });
            
    }
})();

