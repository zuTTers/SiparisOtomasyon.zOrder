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
        vm.orderdetailDataList = [];


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

        vm.ok = function () {
            if (!vm.row.IsDelivered) { vm.row.IsDelivered = false;}
            if (!vm.row.IsPaid) { vm.row.Paid = false;}
            vm.row.OrderDate = new Date(vm.row.OrderDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));

            var input = {
                order: vm.row,
                orderDetail: vm.orderdetailDataList
            }

            $http.post('/api/Orders/Save', input)
                .then(function (response) {
                    if (response.data.success) {
                        $state.reload();
                        $filter("showInfo")($filter, response.data.message, 1000, 'info'); // JSON text denenebilir
                        $uibModalInstance.close('ok');
                    }
                    else {
                        $filter("showInfo")($filter, response.data.message, 1000, 'info'); // JSON text denenebilir
                    }
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
                    vm.row.Quantity = 1;
                    vm.row.Price = response.data.retObject.Price;
                });
        }
        
        vm.totalprice = 0;
        //vm.row.Price = 1;

        vm.addOrderDetail = function (opt, qty, prc) {
            var orderdetail = {};
            vm.totalprice += qty * prc;

            orderdetail.Operation_Id = opt;
            $.each(vm.operationDataList, function (i, v) {
                if (v.Operation_Id == opt) {
                    orderdetail.Operation_Text = v.Name;
                }
            });
            orderdetail.Quantity = qty;
            orderdetail.Price = prc;
            orderdetail.TotalPrice = vm.totalprice;

            vm.orderdetailDataList.push(orderdetail);
        }

        vm.removeOrderDetail = function (index) {
            vm.totalprice -= vm.orderdetailDataList[index - 1].Price;
            vm.orderdetailDataList.splice(index - 1, 1);
        }


    }
})();


