(function() {
    'use strict';

    angular
        .module('petBook.auth.changePassword.controller', [])
        .controller('ChangePasswordCtrl', ChangePasswordCtrl);

    ChangePasswordCtrl.$inject = ['$scope', '$state', '$timeout', '$stateParams', 'StorageService', 'ionicMaterialInk', 'AuthService', '$ionicSideMenuDelegate'];

    /* @ngInject */
    function ChangePasswordCtrl($scope, $state, $timeout, $stateParams, StorageService, ionicMaterialInk, AuthService, $ionicSideMenuDelegate, $ionicLoading) {
        var vm = $scope;
        vm.changePassword = changePassword;


        $ionicSideMenuDelegate.canDragContent(false);
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

        //Change or change password
        function changePassword(){
            console.log('password clicked');
        };

          function validatePassword(pw, nv) {
            if (pw != nv) {
                return true;
            } else {
                return false;
            }
        };

    }
})();
