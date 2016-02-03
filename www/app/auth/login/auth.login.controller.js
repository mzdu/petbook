(function() {
    'use strict';

    angular
        .module('petBook.auth.login.controller', [])
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$state', '$timeout', '$stateParams', 'StorageService', 'ionicMaterialInk', 'AuthService', '$ionicSideMenuDelegate'];

    /* @ngInject */
    function LoginCtrl($scope, $state, $timeout, $stateParams, StorageService, ionicMaterialInk, AuthService, $ionicSideMenuDelegate, $ionicLoading) {
        var vm = $scope;
        vm.login = login;
        vm.register = register;
        vm.retrievePassword = retrievePassword;


        $ionicSideMenuDelegate.canDragContent(false);
        $scope.$parent.clearFabs();
        $timeout(function() {
            $scope.$parent.hideHeader();
        }, 0);
        ionicMaterialInk.displayEffect();

        function login() {
            // $state.go('app.moments');
            
            // Start showing the progress
            $scope.showLoading($ionicLoading);
            var promise = AuthService.login($scope.user);
            promise.then(function(user, err) {
                console.log('user is: ', user);
                if (!err && user.token) {
                    StorageService.setCurrentUser(user);
                    if(user.user.needsToChangePassword){
                        $state.go('app.changePassword');
                    } else {
                        $state.go('app.moments');
                    }
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

        //forgot or change password

        function retrievePassword(){
            $state.go('app.forgotPassword');
        };


    }
})();
