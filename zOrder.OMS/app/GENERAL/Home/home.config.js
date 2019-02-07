zk_modules.push('Home');

(function () {
    angular
        .module('Home')
        .config(HomeConfig);

    function HomeConfig($urlRouterProvider, $stateProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('Home', {
                url: '/Home',
                views: {
                    '': {
                        templateUrl: 'GENERAL/Home/home.html',
                        controller: 'HomeController',
                        controllerAs: 'vm'
                    }
                },
                data: {

                }
            });
            
    }
})();

