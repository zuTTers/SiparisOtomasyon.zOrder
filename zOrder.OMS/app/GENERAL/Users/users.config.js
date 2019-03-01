zk_modules.push('Users');

(function () {
    angular
        .module('Users')
        .config(UsersConfig);

    function UsersConfig($urlRouterProvider, $stateProvider) {
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
                },
                data: {

                }
            });
            
    }
})();

