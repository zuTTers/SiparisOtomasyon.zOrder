zk_modules.push('Orders');

(function () {
    angular
        .module('Orders')
        .config(OrdersConfig);

    function OrdersConfig($urlRouterProvider, $stateProvider, $httpProvider, $qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('Orders', {
                url: '/Orders',
                views: {
                    '': {
                        templateUrl: 'GENERAL/Orders/orders.html',
                        controller: 'OrdersController',
                        controllerAs: 'vm'
                    }
                    ,
                    'OrdersDialog': {
                        templateUrl: 'GENERAL/Orders/orders.dialog.html',
                        controller: 'OrdersDialogController',
                        controllerAs: 'vm'
                    }
                },
                data: {

                }
            });
            
    }
})();

