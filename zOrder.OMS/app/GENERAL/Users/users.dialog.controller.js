(function () {
    'use strict'
    angular
        .module('Users')
        .controller('UsersDialogController', UsersDialogController);

    /* @ngInject */
    function UsersDialogController($scope, $state, $http, $timeout, $uibModalInstance, $filter, data) {
        var vm = this;

        vm.row = data.row;
        vm.edit = data.edit;

        if (vm.edit) { vm.Title = 'Kullanıcı Düzenle'; } else { vm.Title = 'Kullanıcı Ekle'; }

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
            $http.post('/api/Users/Save', vm.row)
                .then(function (response) {
                    $state.reload();
                    $filter("showInfo")($filter, 'Kaydedildi', 1000, 'info'); // JSON text denenebilir
                    $uibModalInstance.close('ok');
                });
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }
})();


