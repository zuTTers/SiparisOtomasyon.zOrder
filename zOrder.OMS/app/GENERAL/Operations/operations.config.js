zk_modules.push('Operations');

(function () {
    angular
        .module('Operations')
        .config(OperationsConfig);

    function OperationsConfig($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('Operations', {
                url: '/Operations',
                views: {
                    '': {
                        templateUrl: 'GENERAL/Operations/operations.html',
                        controller: 'OperationsController',
                        controllerAs: 'vm'
                    }
                },
                data: {

                }
            });
            
    }
})();

