(function() {
    'use strict';

    angular
        .module('petBook.auth.login.controller', [])
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$state', '$timeout', '$stateParams', 'StorageService', 'ionicMaterialInk', 'AuthService', '$ionicSideMenuDelegate', 'EmailService'];

    /* @ngInject */
    function LoginCtrl($scope, $state, $timeout, $stateParams, StorageService, ionicMaterialInk, AuthService, $ionicSideMenuDelegate, $ionicLoading, EmailService) {
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
            // Start showing the progress
            $scope.showLoading($ionicLoading);
            var promise = AuthService.login($scope.user);
            promise.then(function(user, err) {
                // console.log('user is: ', user);
                // returns a list of users
                console.log('user is: ', user);
                if (!err && user.token) {
                    StorageService.setCurrentUser(user);
                    //EmailService.email(user);                                        
                    $state.go('app.moments');
                } else {
                    console.log('error is: ', err);
                    $scope.error = err;
                }
                return;
            }, function(response) {
                if(response.statusText === 'Unauthorized'){
                    $scope.error = 'Invalid user name or password';    
                } else {
                    $scope.error = 'Error: there was an issue logging in. ';
                }
                
                // 'invalid credentials';
            }) //end of then
            .finally(function($ionicLoading) {
                //hide the loading
                $scope.hideLoading($ionicLoading);
            });

            //        $state.go('app.home');

        };

        function register() {
            $state.go('app.register');
        };
    }
})();
