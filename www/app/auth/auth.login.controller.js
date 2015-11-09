(function() {
    'use strict';

    angular
        .module('petBook.auth.login.controller', [])
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$state', '$timeout', '$stateParams', 'StorageService', 'ionicMaterialInk', 'AuthService', '$ionicSideMenuDelegate'];

    /* @ngInject */
    function LoginCtrl($scope, $state, $timeout, $stateParams, StorageService, ionicMaterialInk, AuthService, $ionicSideMenuDelegate) {
        var vm = this;
        vm.login = login;
        vm.register = register;
        activate();


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
                console.log('error login!');
                $scope.error = 'invalid credentials';
            }); //end of then

            //        $state.go('app.home');

        };

        function register() {
            $state.go('app.register');
        };
    }
})();



.controller('RegisterCtrl', function($scope, $state, $timeout, $stateParams, StorageService, ionicMaterialInk, AuthService, $ionicSideMenuDelegate) {

    $ionicSideMenuDelegate.canDragContent(false)
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();

    $scope.user = {};

    $scope.$watch('user.password2', function(newvalue) {
        $scope.passwordMismatch = validatePassword($scope.user.password, newvalue);
        // if($scope.user.password != newvalue)
        // {
        //     $scope.passwordMismatch = true;
        // }
        // else{
        //     $scope.passwordMismatch = false;
        //     console.log("Passwords Match");
        // }
        console.log('newvalue value is: ', newvalue);
    });

    $scope.$watch('user.password', function(newvalue) {
        $scope.passwordMismatch = validatePassword($scope.user.password, newvalue);
        // if($scope.user.password != newvalue)
        // {
        //     $scope.passwordMismatch = true;
        // }
        // else{
        //     $scope.passwordMismatch = false;
        //     console.log("Passwords Match");
        // }
        console.log('newvalue value is: ', newvalue);
    });

    $scope.Register = function() {

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
        }); //end of then
    }; // end of sign up   

    $scope.login = function() {
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
})
