(function () {
    angular
        .module('Home')
        .controller('HomeController', HomeController);

    /* @ngInject */
    function HomeController($scope) {
        var vm = $scope;
        vm.Title = 'Genel';
    }
})();


