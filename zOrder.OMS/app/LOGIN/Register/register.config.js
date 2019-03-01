(function () {
    angular
        .module('Register')
        .config(RegisterConfig);

    function RegisterConfig($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('Register', {
                url: '/Register',
                views: {
                    '': {
                        templateUrl: 'LOGIN/Register/register.html',
                        controller: 'RegisterController',
                        controllerAs : 'vm'
                    }
                },
                data: {

                }
            });
    }
})();