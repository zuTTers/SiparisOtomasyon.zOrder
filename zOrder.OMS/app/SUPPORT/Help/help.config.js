zk_modules.push('Help');

(function () {
    angular
        .module('Help')
        .config(HelpConfig);

    function HelpConfig($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('Help', {
                url: '/Help',
                views: {
                    '': {
                        templateUrl: 'SUPPORT/Help/help.html',
                        controller: 'HelpController',
                        controllerAs: 'vm'
                    }
                },
                data: {

                }
            });
            
    }
})();

