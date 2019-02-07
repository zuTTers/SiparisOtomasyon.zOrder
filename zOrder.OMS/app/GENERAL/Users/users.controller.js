(function () {
    angular
        .module('Users')
        .controller('UsersController', UsersController);

    /* @ngInject */
    function UsersController($scope) {
        var vm = $scope;
        vm.Title = 'Personeller';
    }
})();


