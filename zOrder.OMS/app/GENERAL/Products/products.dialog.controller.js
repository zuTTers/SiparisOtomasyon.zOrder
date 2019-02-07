(function () {
    'use strict'
    angular
        .module('Products')
        .controller('ProductsDialogController', ProductsDialogController);

    /* @ngInject */
    function ProductsDialogController($scope, $state, $http, $uibModalInstance) {
        var vm = this;
        vm.Title = 'Ürün Düzenle';

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

        vm.ok = function () {
            $uibModalInstance.close('ok');
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();


