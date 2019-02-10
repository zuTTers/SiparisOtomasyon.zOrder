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
            limit: '10',
            order: 'Created_Date',
            page: 1,
            count: 0
        };

        vm.filter = {};
        vm.data = [];

        vm.currentPage = 1;

        function getList() {

            $http.get('/api/Product/List')
                .then(function (response) {
                    vm.data = response.data.retObject;
                    vm.query.count = response.data.retObject.lenght;
                    //$filter("showInfo")($filter, response.data.message, 3000, 'info'); // JSON text denenebilir
                    //zotify(response.data.message);
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
                    $state.reload();
                    $filter("showInfo")($filter, 'Silindi', 1000, 'info'); // JSON text denenebilir
                });

        }    

        //$scope.reloadRoute = function () {
        //    $state.reload();
        //};
    }
})();


