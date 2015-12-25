(function() {
    'use strict';

    angular
        .module('petBook.auth.forgotPassword.controller', [])
        .controller('ForgotPasswordCtrl', ForgotPasswordCtrl);

    ForgotPasswordCtrl.$inject = ['$scope', '$state', '$timeout', '$stateParams', 'StorageService', 'ionicMaterialInk', 'AuthService', '$ionicSideMenuDelegate', '$cordovaToast'];

    /* @ngInject */
    function ForgotPasswordCtrl($scope, $state, $timeout, $stateParams, StorageService, ionicMaterialInk, AuthService, $ionicSideMenuDelegate, $ionicLoading, $cordovaToast) {
        var vm = $scope;
        vm.sendPassword = sendPassword;
        vm.errorMessage = '';
        vm.successMessage = '';

        $ionicSideMenuDelegate.canDragContent(false);
        $scope.$parent.clearFabs();
        $timeout(function() {
            $scope.$parent.hideHeader();
        }, 0);
        ionicMaterialInk.displayEffect();

        vm.user = {};
        //forgot or change password

        function sendPassword() {
            AuthService.forgotPassword(vm.user)
                .then(sendPasswordSuccess, sendPasswordError)
                .catch(sendPasswordError);
            // $state.go('app.changePassword');
        };

        function sendPasswordSuccess(result, error) {
            if (!error && result.success) {
                var successMessage = 'Please check your email for your temporary password';
                //display success message
                if($cordovaToast){
                    $cordovaToast
                    .show(successMessage, 'long', 'center')
                    .then(function(success) {
                      $state.go('app.login')
                    }, function (error) {
                      // error
                    });
                } else {
                    vm.successMessage = successMessage;
                    vm.errorMessage = '';
                }

            } else {
                //display error message
                vm.errorMessage = 'Error: Your password cannot be reset at this time.'
                vm.successMessage = '';
            }
        }

        function sendPasswordError(response) {
            vm.displayMessage = 'Error: Your password cannot be reset at this time.'
        }
    }
})();
