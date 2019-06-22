(function () {
    angular
        .module('app', zk_modules)
        .config(
            function appConfig($urlRouterProvider, $stateProvider) {


                $stateProvider
                    .state('/', {
                        url: '/',
                        views: {
                            '': {
                                templateUrl: 'GENERAL/Orders/orders.html',
                                controller: 'OrdersController',
                                controllerAs: 'vm'
                            }
                        },
                        data: {

                        }
                    });
            })
        //my first filter
        .filter('yesNo', function () {
            return function (input) {
                return input ? 'Evet' : 'Hayır';
            }
        })
        .filter('jsDate', function () {
            return function (x) {
                var jsonDateRE = /^\/Date\((-?\d+)(\+|-)?(\d+)?\)\/$/;
                var arr = jsonDateRE.exec(x);
                if (arr) {
                    // 0 - complete results; 1 - ticks; 2 - sign; 3 - minutes;
                    return new Date(parseInt(arr[1]));
                }
                return x;
            }
        })
        .filter('formatDate', function () {
            return function (formattedDate) {
                try {
                    formattedDate = new Date(formattedDate);
                    var d = formattedDate.getDate();
                    var m = formattedDate.getMonth();
                    m += 1; // javascript months are 0-11
                    m = ("00" + m).substr(("00" + m).length - 2);
                    d = ("00" + d).substr(("00" + d).length - 2);
                    var y = formattedDate.getFullYear();
                    return (d + "-" + m + "-" + y);
                } catch (e) {
                    return formattedDate;
                }
            }
        })
        .filter('chechSession', function () {
            return function ($state, $filter) {
                try {
                    if (localStorage.getItem('uk') == undefined) {
                        $filter("showInfo")($filter, 'Giriş yapınız', 1000, 'info');
                        $state.go("SignIn");
                    }

                } catch (e) {
                    console.log(e);
                }
            }
        })
        .filter('showInfo', function () {
            return function ($filter, msgtext, delay, msgtype) {
                try {
                    if (delay == undefined) delay = 2000;
                    $.notify({
                        icon: 'fa fa-info',
                        message: msgtext,
                    },
                        {
                            type: msgtype,
                            timer: delay
                        });
                } catch (e) {
                    console.log(e);
                }
            }
        })
        //ion-loader component
        //source: https://codepen.io/dannystyle/pen/myYbRy?editors=0010
        //
        .factory('httpLoadingInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {
            // Request iteration counter - count requests started
            var reqIteration = 0;
            return {
                request: function (config) {
                    // Firing event only if current request was the first
                    if (reqIteration === 0) {
                        $rootScope.$broadcast('globalLoadingStart');
                    }
                    // Increasing request iteration
                    reqIteration++;
                    return config || $q.when(config);
                },
                response: function (config) {
                    // Decreasing request iteration
                    reqIteration--;
                    // Firing event only if current response was came to the last request
                    if (!reqIteration) {
                        $rootScope.$broadcast('globalLoadingEnd');
                    }
                    return config || $q.when(config);
                }
            };
        }])
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('httpLoadingInterceptor');
        }])
        .directive('ionLoader', function () {
            return {
                restrict: 'E',
                replace: true,
                template: '<div class="ion-loader"><svg class="ion-loader-circle"> <circle class="ion-loader-path" cx="50%" cy="50%" r="20" fill="none" stroke-miterlimit="20"/></svg></div>',
                link: function (scope, element) {

                    // Applying base class to the element
                    angular.element(element).addClass('ion-hide');

                    // Listening to 'globalLoadingStart' event fired by interceptor on request sending
                    scope.$on('globalLoadingStart', function () {
                        console.log("Loading started...");
                        angular.element(element).toggleClass('ion-show ion-hide');
                    });

                    // Listening to 'globalLoadingEnd' event fired by interceptor on response receiving
                    scope.$on('globalLoadingEnd', function () {
                        console.log("Loading ended...");
                        angular.element(element).toggleClass('ion-hide ion-show');
                    });
                }
            }
        })

    //my first directive
    //.directive('myEnter', function () {
    //    return function (scope, element, attrs) {
    //        element.bind("keydown keypress", function (event) {
    //            if (event.which === 13) {
    //                scope.$apply(function () {
    //                    scope.$eval(attrs.myEnter);
    //                });

    //                event.preventDefault();
    //            }
    //        })
    //    }
    //})
    //.directive('IsNumber', function () {
    //    return function (element) {
    //        element.bind("keydown keypress", function (evt) {
    //            evt = (evt) ? evt : window.event;
    //            var charCode = (evt.which) ? evt.which : evt.keyCode;
    //            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    //                return false;
    //            }
    //            return true;
    //        })
    //    }
    //})

})();

