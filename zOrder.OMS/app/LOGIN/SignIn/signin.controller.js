    angular
        .module('SignIn')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($scope) {
        var vm = $scope;
        vm.Title = 'Giriş';

    }
