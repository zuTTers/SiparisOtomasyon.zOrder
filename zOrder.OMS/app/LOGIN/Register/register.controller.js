angular
    .module('Register')
    .controller('RegisterController', RegisterController);

/* @ngInject */
function RegisterController($scope) {
    var vm = $scope;
    vm.Title = 'Kayıt Ol';

}
