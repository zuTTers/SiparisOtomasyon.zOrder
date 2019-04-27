(function () {
    angular
        .module('Receipt')
        .controller('ReceiptController', ReceiptController);

    /* @ngInject */
    function ReceiptController($scope, $state, $http, $filter, $timeout, $uibModal, $log) {
        var vm = this;
        vm.Title = 'Fişler';

        vm.query = {
            filter: '',
            limit: '25',
            order: 'Created_Date',
            page: 1,
            count: 0
        };

        vm.filter = {};
        vm.data = [];

        vm.sort = function (keyname) {
            vm.sortKey = keyname;
            vm.reverse = !vm.reverse;
        };

    }
})();


