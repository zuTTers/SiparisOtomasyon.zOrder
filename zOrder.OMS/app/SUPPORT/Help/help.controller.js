(function () {
    angular
        .module('Help')
        .controller('HelpController', HelpController);

    /* @ngInject */
    function HelpController($scope) {
        var vm = $scope;
        vm.Title = 'Yardım';
    }
})();


