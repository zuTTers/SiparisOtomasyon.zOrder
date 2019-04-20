(function () {
    'use strict'
    angular
        .module('Orders')
        .controller('OrdersDialogController', OrdersDialogController);

    /* @ngInject */
    function OrdersDialogController($scope, $state, $http, $timeout, $uibModalInstance, $filter, data) {
        var vm = this;

        vm.row = data.row;
        vm.edit = data.edit;

        if (vm.edit) { vm.Title = 'Fiş Detay'; } else { vm.Title = 'Fiş Çıkar'; }

        vm.fastOrder = true;
        vm.normalOrder = false;

        vm.showfastOrder = function () { vm.fastOrder = true; vm.normalOrder = false; }
        vm.shownormalOrder = function () { vm.normalOrder = true; vm.fastOrder = false; }

        vm.minDate = new Date().toDateString();

        vm.operationDataList = [];
        vm.productDataList = [];

        /*Textbox'ın sadece int değer almasını sağlar.*/
        vm.IsNumber = function (evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                return false;
            }
            return true;
        }

        //if (localStorage.getItem("uk") == undefined) {
        //    $state.go("SignIn");
        //    //location.href = "/SignIn";
        //}

        vm.query = {
            filter: '',
            limit: '10',
            order: 'Created_Date',
            page: 1,
            count: 0
        };

        vm.filter = {};
        //vm.data = [];

        vm.ok = function (edit) {
            $http.post('/api/Orders/Save', vm.row)
                .then(function (response) {
                    $state.reload();
                    $filter("showInfo")($filter, 'Kaydedildi', 1000, 'info'); // JSON text denenebilir
                    $uibModalInstance.close('ok');
                });
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $http.get('/api/Orders/ProductList')
            .then(function (response) {
                vm.productDataList = [];
                vm.productDataList = response.data.retObject;
            });

        vm.getOperations = function (id) {
            $http.get('/api/Orders/OperationList?id=' + id)
                .then(function (response) {
                    vm.operationDataList = [];
                    vm.operationDataList = response.data.retObject;
                });
        }

        vm.getOperationPrice = function (id) {
            $http.get('/api/Orders/PriceList?id=' + id)
                .then(function (response) {
                    vm.row.Price = response.data.retObject.Price;
                });
        }
        




    }
})();


