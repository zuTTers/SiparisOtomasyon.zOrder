(function () {
    angular
        .module('Customers')
        .controller('CustomersController', CustomersController);

    /* @ngInject */
    function CustomersController($scope) {
        var vm = $scope;
        vm.Title = 'Müşteriler';
    }
})();


