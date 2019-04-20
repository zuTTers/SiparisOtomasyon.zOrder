(function () {
    'use strict'
    angular
        .module('Products')
        .controller('ProductsController', ProductsController);

    /* @ngInject */
    function ProductsController($scope, $state, $http, $filter, $timeout, $uibModal, $log) {
        var vm = this;
        vm.Title = 'Ürünler';

        vm.query = {
            filter: '',
            limit: '25',
            order: 'Product_Id',
            page: 1,
            count: 0
        };

        vm.filter = {};
        vm.data = [];

        vm.sort = function (keyname) {
            vm.sortKey = keyname;
            vm.reverse = !vm.reverse;
        };


        function getList() {
            //$filter("chechSession")($filter, response, 1000, 'info');

            $http.get('/api/Product/List')
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
            //var parentElem = row ?
            //    angular.element($document[0].querySelector('.modal-demo ' + row)) : undefined;
            var modalInstance = $uibModal.open({
                animation: ProductsController.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'GENERAL/Products/products.dialog.html',
                controller: 'ProductsDialogController',
                controllerAs: 'vm',
                size: size,
                //appendTo: parentElem,
                resolve: {
                    data: function () {
                        return data = { row, edit: type };
                    }
                }
            });
            modalInstance.result.then(function (row) {
                ProductsDialogController.selected = row;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        vm.delete = function (id) {
            $http.get('/api/Product/Delete?id=' + id)
                .then(function (response) {
                    //$state.reload();
                    getList();
                    $filter("showInfo")($filter, 'Silindi', 1000, 'info'); // JSON text denenebilir
                });

        };



    }

})();


