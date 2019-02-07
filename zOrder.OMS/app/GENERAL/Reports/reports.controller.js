(function () {
    angular
        .module('Reports')
        .controller('ReportsController', ReportsController);

    /* @ngInject */
    function ReportsController($scope) {
        var vm = $scope;
        vm.Title = 'Raporlar';
    }
})();


