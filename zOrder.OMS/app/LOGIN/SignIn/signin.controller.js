(function () {
    angular
        .module('SignIn')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($scope, $state, $http, $filter, $timeout, $uibModal, $log, $window) {
        var vm = this;
        vm.Title = 'Giriş';

        vm.giris = function () {
            $http.get('/api/Login/userAuthentication?username=' + vm.kullanici + '&password=' + vm.parola)
                .then(function (response) {
                    if (response.data.success) {
                        $filter("showInfo")($filter, response.data.message, 3000, 'info'); // JSON text denenebilir
                        localStorage.setItem("uk", response.data.retObject.token);
                        $window.location.href = 'index.html';
                    }
                    else {
                        $filter("showInfo")($filter, response.data.message, 3000, 'info'); // JSON text denenebilir
                    }

                });
        }
    }
})();