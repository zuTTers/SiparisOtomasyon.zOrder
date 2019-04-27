(function () {
    'use strict'
    angular
        .module('Receipt')
        .controller('ReceiptDialogController', ReceiptDialogController);

    /* @ngInject */
    function ReceiptDialogController($scope, $state, $http, $timeout, $filter, $stateParams) {
        var vm = this;

        vm.data = [];
        //var myid = $stateParams.Order_Id;

        vm.receipt = function () {
            $http.get('/api/Receipt/Detail?id=' + $stateParams.Order_Id)
                .then(function (response) {
                    vm.data = response.data.retObject;
                    vm.row = response.data.retObject;
                    $filter("showInfo")($filter, response.data.message, 1000, 'info'); // JSON text denenebilir
                });
        };

        vm.receipt();

        vm.printReceipt = function () {
            setTimeout(function () { window.print(); }, 1000);
            window.onfocus = function () { setTimeout(function () { window.close(); }, 1000); }
        }



    }
})();


