(function() {
    'use strict';

    angular
        .module('petBook.profile.controller', [])
        .controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['$scope', '$stateParams', '$timeout', 'ionicMaterialMotion', 'ionicMaterialInk', 'StorageService', 'ProfileService', '$ionicPopup'];

    /* @ngInject */
	function ProfileCtrl($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, StorageService, ProfileService, $ionicPopup) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    // $scope.isExpanded = false;
    // $scope.$parent.setExpanded(false);
    // $scope.$parent.setHeaderFab(false);
    $scope.user = StorageService.getCurrentUser().user;
    $scope.user.avatar='';
    //console.log('scope user is ', $scope.user);

    $scope.field = $stateParams.field;
    if ($scope.field === 'dob') {

        $scope.value = new Date($stateParams.value);
    } else {
        $scope.value = $stateParams.value;
    }
    //console.log('$scope.field = ', $scope.field);
    //console.log('$scope.value = ', $scope.value);
    if ($scope.field && $scope.value) {
        console.log('got both field and value');
        $scope.user.pet[$scope.field] = $scope.value;
    }



    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
   
   };
})();