(function () {
    'use strict'
    angular
        .module('Products')
        .controller('ProductsController', ProductsController);

    /* @ngInject */
    function ProductsController($scope, $state, $http, $timeout, $uibModal, $log) {
        var vm = this;
        vm.Title = 'Ürünler';

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
        vm.data = [];

        function getList() {

            $http.get('/api/Product/List')
                .then(function (response) {
                    vm.data = response.data.retObject;
                    zotify(response.data.message);
                });
               
        }

        getList();

        vm.edit = function (size, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: ProductsController.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'GENERAL/Products/products.dialog.html',
                controller: 'ProductsDialogController',
                controllerAs: 'vm',
                size: size,
                appendTo: parentElem,
                resolve: {
                    items: function () {
                        return ProductsController.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                ProductsDialogController.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };



        //$scope.edit = function (item) {

        //    var itemToEdit = item;

        //    $dialog.dialog(angular.extend(dialogOptions, { resolve: { item: angular.copy(itemToEdit) } }))
        //        .open()
        //        .then(function (result) {
        //            if (result) {
        //                angular.copy(result, itemToEdit);
        //            }
        //            itemToEdit = undefined;
        //        });
        //};

        //ekle ile düzenle benzer
        //vm.addNew = function () {
        //    //boş row model
        //    newrow = {
        //        Product_Id: 0,
        //        Name : '',
        //        IsActive : 1,
        //        PhotoUrl : '',
        //    }
        //}

        //vm.edit = function () {
            //$timeout(function () {
            //    $dialog.dialog({}).open('products.dialog.html');
            //}, 3000);
            //$http.post('/api/Product/Save', row)
            //    .then(function (response) {
            //        $state.go('/Product');
            //        zotify(response.data.message);
            //    });
        //}

        vm.delete = function (id) {

        }

        //function getData() {

        //    var input = {
        //        query: JSON.stringify(vm.query),
        //        filter: JSON.stringify(vm.filter)
        //    }

        //    $.post("/api/Product/List", function (data, status) {
        //        $state.go('/Product');
        //        if (data.success) {
        //            vm.data = data.retObject;
        //            //vm.query.count = data.count;
        //        }
        //    });
        //}

        //getData();


        

    }
})();


