zk_modules.push('Reports');

(function () {
    angular
        .module('Reports')
        .config(ReportsConfig);

    function ReportsConfig($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('Reports', {
                url: '/Reports',
                views: {
                    '': {
                        templateUrl: 'GENERAL/Reports/reports.html',
                        controller: 'ReportsController',
                        controllerAs: 'vm'
                    }
                },
                data: {

                }
            });
            
    }
})();

