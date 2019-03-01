(function () {
    angular
        .module('SignIn')
        .config(SignInConfig);

    function SignInConfig($urlRouterProvider, $stateProvider) {
        //$urlRouterProvider.otherwise('/');

        $stateProvider
            .state('SignIn', {
                url: '/SignIn',
                views: {
                    '': {
                        templateUrl: 'LOGIN/SignIn/signin.html',
                        controller: 'LoginController',
                        controllerAs : 'vm'
                    }
                },
                data: {

                }
            });
    }
})();