(function () {
    'use strict'
    angular
        .module('Orders')
        .controller('OrdersController', OrdersController);

    /* @ngInject */
    function OrdersController($scope, $state, $http, $filter, $timeout, $uibModal, $log) {
        var vm = this;
        vm.Title = 'Siparişler';

        vm.query = {
            filter: '',
            limit: '25',
            order: 'Order_Id',
            page: 1,
            count: 0
        };

        vm.filter = {};
        vm.data = [];


        vm.sort = function (keyname) {
            vm.sortKey = keyname;
            vm.reverse = !vm.reverse;
        };

        vm.sort(vm.query.order);


        function getList() {
            //$filter("chechSession")($filter, response, 1000, 'info');

            $http.get('/api/Orders/List')
                .then(function (response) {

                    vm.data = response.data.retObject;
                    vm.query.count = response.data.retObject.length;
                    //$filter("showInfo")($filter, response.data.message, 3000, 'info'); // JSON text denenebilir

                    vm.numOfPages = function () {
                        return Math.ceil(vm.query.count / vm.query.limit);
                    };

                    $scope.$watch('vm.query.page + vm.query.limit', function () {
                        var begin = ((vm.query.page - 1) * vm.query.limit),
                            end = begin + vm.query.limit;
                        vm.items = vm.data.slice(begin, end);
                    });

                });

        }

        getList();


        vm.edit = function (size, row, type) {
            var data = {};

            vm.main = {};
            vm.detail = {};

            if (row) {
                $http({
                    method: 'GET',
                    url: '/api/Orders/Detail?id=' + row.Order_Id
                }).then(function (response) {
                    vm.main = response.data.retObject.order;
                    vm.detail = response.data.retObject.orderdetail;

                    var modalInstance = $uibModal.open({
                        animation: OrdersController.animationsEnabled,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'GENERAL/Orders/orders.dialog.html',
                        controller: 'OrdersDialogController',
                        controllerAs: 'vm',
                        size: size,
                        //appendTo: parentElem,
                        resolve: {
                            data: function () {
                                return data = { row: row, edit: type, order: vm.main, orderDetail: vm.detail };
                            }
                        }
                    });
                    modalInstance.result.then(function (row) {
                        OrdersDialogController.selected = row;
                    }, function () {
                        $log.info('Modal dismissed at: ' + new Date());
                    });

                });
            }
            else {
                var modalInstance = $uibModal.open({
                    animation: OrdersController.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'GENERAL/Orders/orders.dialog.html',
                    controller: 'OrdersDialogController',
                    controllerAs: 'vm',
                    size: size,
                    //appendTo: parentElem,
                    resolve: {
                        data: function () {
                            return data = { row: row, edit: type };
                        }
                    }
                });
                modalInstance.result.then(function (row) {
                    OrdersDialogController.selected = row;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }


        };

        vm.delete = function (id) {
            $http({
                method: 'GET',
                url: '/api/Orders/Delete?id=' + id
            }).then(function (response) {
                    //alert('test sil :' + response.data.retObject);
                    //$state.reload();
                    getList();
                    $filter("showInfo")($filter, 'Silindi', 1000, 'info'); // JSON text denenebilir
                });
        };

        vm.receipt = function (row) {
            
            //$state.go('Receipt');
            //window.open('receipt.html','_target');
            var url = $state.href('Receipt', {
                Order_Id: row
            });
            window.open(url, '_blank');

            //var url = $state.href('Receipt', {
            //    Order_Id: row
            //});
            //window.open(url, '_blank');
        }

        //vm.getDetailData = function (id) {
        //    vm.row = [];

        //    $http({
        //        method: 'GET',
        //        url: '/api/Orders/Detail?id=' + id
        //    }).then(function (data) {
        //        console.log('get', data);

        //        var data = data.data;
        //        var status = data.status;
        //        var statusText = data.statusText;
        //        var headers = data.headers;
        //        var config = data.config;
        //        $scope.text = data;


        //        vm.row = response.data.retObject;

        //    }).catch(function (data, status) {
        //        console.error('Gists error', response.status, response.data);
        //    }).finally(function () {
        //        console.log("finally finished gists");
        //    });

        //}

    }

})();


