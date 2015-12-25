(function() {
    'use strict';

    angular
        .module('petBook.auth.forgotPassword.controller', [])
        .controller('ForgotPasswordCtrl', ForgotPasswordCtrl);

    ForgotPasswordCtrl.$inject = ['$scope', '$state', '$timeout', '$stateParams', 'StorageService', 'ionicMaterialInk', 'AuthService', '$ionicSideMenuDelegate'];

    /* @ngInject */
    function ForgotPasswordCtrl($scope, $state, $timeout, $stateParams, StorageService, ionicMaterialInk, AuthService, $ionicSideMenuDelegate, $ionicLoading) {
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
                //display success message
                vm.successMessage = 'Please check your email for your temporary password';
                vm.errorMessage = '';

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
