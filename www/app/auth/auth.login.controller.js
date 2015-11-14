(function() {
    'use strict';

    angular
        .module('petBook.auth.login.controller', [])
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$state', '$timeout', '$stateParams', 'StorageService', 'ionicMaterialInk', 'AuthService', '$ionicSideMenuDelegate'];

    /* @ngInject */
    function LoginCtrl($scope, $state, $timeout, $stateParams, StorageService, ionicMaterialInk, AuthService, $ionicSideMenuDelegate) {
        var vm = $scope;
        vm.login = login;
        vm.register = register;
        vm.foo = 'bar';


        $ionicSideMenuDelegate.canDragContent(false);
        $scope.$parent.clearFabs();
        $timeout(function() {
            $scope.$parent.hideHeader();
        }, 0);
        ionicMaterialInk.displayEffect();

        function login() {

            var promise = AuthService.login($scope.user);
            promise.then(function(user, err) {
                // console.log('user is: ', user);
                // returns a list of users
                console.log('user is: ', user);
                if (!err && user.token) {
                    StorageService.setCurrentUser(user);
                    $state.go('app.moments');
                } else {
                    console.log('error is: ', err);
                    $scope.error = err;
                }
                return;
            }, function(response) {
                //console.log('error login!');
                $scope.error = response;
                // 'invalid credentials';
            }); //end of then

            //        $state.go('app.home');

        };

        function register() {
            $state.go('app.register');
        };
    }
})();


