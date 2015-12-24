(function() {
    'use strict';

    angular
        .module('petBook.auth.forgotPassword.controller', [])
        .controller('ForgotPasswordCtrl', ForgotPasswordCtrl);

    ForgotPasswordCtrl.$inject = ['$scope', '$state', '$timeout', '$stateParams', 'StorageService', 'ionicMaterialInk', 'AuthService', '$ionicSideMenuDelegate'];

    /* @ngInject */
    function ForgotPasswordCtrl($scope, $state, $timeout, $stateParams, StorageService, ionicMaterialInk, AuthService, $ionicSideMenuDelegate, $ionicLoading) {
        var vm = this;
        vm.retrievePassword = retrievePassword;

        console.log('ForgotPasswordCtrl');
        $ionicSideMenuDelegate.canDragContent(false);
        $scope.$parent.clearFabs();
        $timeout(function() {
            $scope.$parent.hideHeader();
        }, 0);
        ionicMaterialInk.displayEffect();

        //forgot or change password

        function retrievePassword(){
            $state.go('app.forgotpassword');
        };
    }
})();
