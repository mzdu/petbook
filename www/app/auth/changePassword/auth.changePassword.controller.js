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

        vm.user = {};        
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
            console.log('change password clicked');
            var currentUser = StorageService.getCurrentUser().user;
            console.log('currentUser = ', currentUser);
            var userObj = {
                username: currentUser.username,
                newPass: vm.user.password,
                oldPass: vm.user.oldPassword
            }
            AuthService.forgotPassword(userObj)
            .then(forgotPasswordSuccess, forgotPasswordError)
            .catch(forgotPasswordError);
        };

          function validatePassword(pw, nv) {
            if (pw != nv) {
                return true;
            } else {
                return false;
            }
        };

         function forgotPasswordSuccess(result, error) {
            if (!error && result.success) {
                //display success message
                console.log('succcess');

            } else {
                //display error message
                console.log('error');
            }
        }

        function forgotPasswordError(response) {
            console.log('response is: ', response);
        }

    }
})();
