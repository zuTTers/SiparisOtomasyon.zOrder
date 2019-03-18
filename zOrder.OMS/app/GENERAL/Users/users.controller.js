(function () {
    'use strict'
    angular
        .module('Users')
        .controller('UsersController', UsersController);

    /* @ngInject */
    function UsersController($scope, $state, $http, $filter, $timeout, $uibModal, $log) {
        var vm = this;
        vm.Title = 'Personeller';

        vm.query = {
            filter: '',
            limit: '25',
            order: 'User_Id',
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

            $http.get('/api/Users/List')
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
                animation: UsersController.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'GENERAL/Users/users.dialog.html',
                controller: 'UsersDialogController',
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
                UsersDialogController.selected = row;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        vm.delete = function (id) {
            $http.get('/api/Users/Delete?id=' + id)
                .then(function (response) {
                    //$state.reload();
                    getList();
                    $filter("showInfo")($filter, 'Silindi', 1000, 'info'); // JSON text denenebilir
                });

        };



    }

})();


