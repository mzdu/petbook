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


        $ionicSideMenuDelegate.canDragContent(false)
        $scope.$parent.clearFabs();
        $timeout(function() {
            $scope.$parent.hideHeader();
        }, 0);
        ionicMaterialInk.displayEffect();

        $scope.user = {};

        $scope.$watch('user.password2', function(newvalue) {
            $scope.passwordMismatch = validatePassword($scope.user.password, newvalue);
           
            console.log('newvalue value is: ', newvalue);
        });

        $scope.$watch('user.password', function(newvalue) {
            $scope.passwordMismatch = validatePassword($scope.user.password2, newvalue);
            console.log('newvalue value is: ', newvalue);
        });

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
                    $state.go('app.profile', {}, {
                        reload: true
                    });
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
                console.log("Passwords Match");
            }
        }
    }
})();

