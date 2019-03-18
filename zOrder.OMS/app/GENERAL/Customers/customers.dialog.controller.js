(function () {
    'use strict'
    angular
        .module('Customers')
        .controller('CustomersDialogController', CustomersDialogController);

    /* @ngInject */
    function CustomersDialogController($scope, $state, $http, $timeout, $uibModalInstance, $filter, data) {
        var vm = this;

        vm.row = data.row;
        vm.edit = data.edit;

        if (vm.edit) { vm.Title = 'Müşteri Düzenle'; } else { vm.Title = 'Müşteri Ekle'; }

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

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();


