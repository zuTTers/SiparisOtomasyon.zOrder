(function () {
    'use strict'
    angular
        .module('Products')
        .controller('ProductsDialogController', ProductsDialogController);

    /* @ngInject */
    function ProductsDialogController($scope, $state, $http, $timeout, $uibModalInstance, data) {
        var vm = this;

        vm.row = data.row;
        vm.edit = data.edit;

        if (vm.edit) { vm.Title = 'Ürün Düzenle'; } else { vm.Title = 'Ürün Ekle'; }

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

        vm.ok = function (edit) {
            $http.post('/api/Product/Save', vm.row)
                .then(function (response) {
                    $uibModalInstance.close('ok');
                    $state.reload();
                    $timeout($filter("showInfo")($filter, 'Kaydedildi', 1000, 'info'), 3000);
                });
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();


