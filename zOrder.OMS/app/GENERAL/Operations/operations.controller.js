(function () {
    angular
        .module('Operations')
        .controller('OperationsController', OperationsController);

    /* @ngInject */
    function OperationsController($scope) {
        var vm = $scope;
        vm.Title = 'Tadilatlar';
    }
})();


