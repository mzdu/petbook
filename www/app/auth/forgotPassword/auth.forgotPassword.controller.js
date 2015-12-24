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

        console.log('ForgotPasswordCtrl');
        $ionicSideMenuDelegate.canDragContent(false);
        $scope.$parent.clearFabs();
        $timeout(function() {
            $scope.$parent.hideHeader();
        }, 0);
        ionicMaterialInk.displayEffect();

        //forgot or change password

        function sendPassword(){
            AuthService.forgotPassword(vm.user)
            .then(function(result, error){
                
            })
            .catch(sendPasswordError);
            // $state.go('app.changePassword');
        };

        function sendPasswordSuccess(result, error){
            if(!error && result.success){
                    //display success message
                    console.log('succcess');
                    
                } else {
                    
                    //display error message
                    console.log('error');
                }
        }

        function sendPasswordError(response){
            console.log('response is: ', response);
            console.log('error');
        }
    }
})();
