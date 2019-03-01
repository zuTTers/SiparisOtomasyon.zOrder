(function () {
    angular
        .module('Home')
        .controller('HomeController', HomeController);

    /* @ngInject */
    function HomeController($scope, $state, $filter) {
        var vm = $scope;
        vm.Title = 'Genel';

        $filter("chechSession")($state, $filter);

        //if (localStorage.getItem('uk') == undefined) { $state.go("SignIn"); }
    }
})();


