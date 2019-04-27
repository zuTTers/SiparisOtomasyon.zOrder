zk_modules.push('Receipt');

(function () {
    angular
        .module('Receipt')
        .config(ReceiptConfig);

    function ReceiptConfig($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('Receipt', {
                url: '/Receipt/:Order_Id',
                views: {
                    '': {
                        templateUrl: 'SUPPORT/Receipt/receipt.dialog.html',
                        controller: 'ReceiptDialogController',
                        controllerAs: 'vm'
                    }
                    ,
                    'ReceiptDialog': {
                        templateUrl: 'SUPPORT/Receipt/receipt.html',
                        controller: 'ReceiptController',
                        controllerAs: 'vm'

                    }
                    
                }
                ,
                params: {
                    Order_Id: {
                        value: null,
                        squash: true
                    },
                },
            });
    }
})();

