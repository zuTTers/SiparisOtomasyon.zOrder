zk_modules.push('Users');

(function () {
    angular
        .module('Users')
        .config(UsersConfig);

    function UsersConfig($urlRouterProvider, $stateProvider, $httpProvider, $qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('Users', {
                url: '/Users',
                views: {
                    '': {
                        templateUrl: 'GENERAL/Users/users.html',
                        controller: 'UsersController',
                        controllerAs: 'vm'
                    }
                    ,
                    'UsersDialog': {
                        templateUrl: 'GENERAL/Users/users.dialog.html',
                        controller: 'UsersDialogController',
                        controllerAs: 'vm'
                    }
                },
                data: {

                }
            });
            
    }
})();

