(function() {
    'use strict';

    angular
        .module('petBook.auth.register.controller', [])
        .controller('RegisterCtrl', RegisterCtrl);

    RegisterCtrl.$inject = ['$scope', '$state', '$timeout', '$stateParams', 'StorageService', 'ionicMaterialInk', 'AuthService', '$ionicSideMenuDelegate', '$ionicLoading'];

    /* @ngInject */
    function RegisterCtrl($scope, $state, $timeout, $stateParams, StorageService, ionicMaterialInk, AuthService, $ionicSideMenuDelegate, $ionicLoading) {
        var vm = $scope;
        vm.login = login;
        vm.register = register;
        vm.changePword = changePword;
        vm.userNameChange = userNameChange;
        vm.emailChange = emailChange;

        $ionicSideMenuDelegate.canDragContent(false)
        $scope.$parent.clearFabs();
        $timeout(function() {
            $scope.$parent.hideHeader();
        }, 0);
        ionicMaterialInk.displayEffect();

        $scope.user = {};

        $scope.$watch('user.password2', function(newvalue) {
            $scope.passwordMismatch = validatePassword($scope.user.password, newvalue);
            //console.log('newvalue value is: ', newvalue);
        });

        $scope.$watch('user.password', function(newvalue) {
            $scope.passwordMismatch = validatePassword($scope.user.password2, newvalue);
            //console.log('newvalue value is: ', newvalue);
        });

        // $scope.$watch('registerForm.email.$valid', function(newvalue) {
        //     console.log('email is: ', newvalue);
        //     //console.log('newvalue value is: ', newvalue);
        // });

        function userNameChange(userName){
            var userObj = {
                username: userName
            };
            AuthService.isUserNameUnique(userObj)
            .then(function(data){
                if(data.unique){
                    $scope.registerForm.username.$setValidity("duplicate", true);
                } else {
                    $scope.registerForm.username.$setValidity("duplicate", false);
                }
            });
        }

        function emailChange(_email){
            var userObj = {
                email: _email
            };
            AuthService.isEmailUnique(userObj)
            .then(function(data){
                if(data.unique){
                    $scope.registerForm.email.$setValidity("duplicate", true);
                } else {
                    $scope.registerForm.email.$setValidity("duplicate", false);
                }
            });
        }

        function register() {
            //loading spinner
            $scope.showLoading($ionicLoading);
            console.log('scope user is: ', $scope.user);
            var promise = AuthService.register($scope.user);
            promise.then(function(user, err) {
                // returns a list of users
                if (!err) {
                    console.log('user is: ', user);
                    StorageService.setCurrentUser(user);
                    $state.go('app.moments');
                } else {
                    console.log('error is: ', err);
                    $scope.error = 'unable to sign up at this time';
                }
            }) //end of then
            .finally(function($ionicLoading) {
                    //hide the loading
                    $scope.hideLoading($ionicLoading);
            });
        }; // end of sign up   

        function login() {
            $state.go('app.login');
        };

        function validatePassword(pw, nv) {
            if (pw != nv) {
                return true;
            } else {
                return false;
            }
        };

        //change password function
        function changePword(){
            
        };
    }
})();

