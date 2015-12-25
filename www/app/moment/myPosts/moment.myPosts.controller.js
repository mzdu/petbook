(function() {
    'use strict';

    angular
        .module('petBook.moment.myPosts.controller', [])
        .controller('MyPostsCtrl', MyPostsCtrl);

    MyPostsCtrl.$inject = ['$scope', '$stateParams', '$timeout', 'ionicMaterialMotion', 'ionicMaterialInk', 'StorageService', 'StatusService', '$ionicLoading'];

    /* @ngInject */
    function MyPostsCtrl($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, StorageService, StatusService, $ionicLoading) {
        console.log('my posts');
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab('right');

        if (!StorageService.getCurrentUser()) {
            return;
        } else {
            $scope.user = StorageService.getCurrentUser().user;
            var promise = StatusService.getAll($scope.user._id);
            // console.log(promise);
            // $scope.posts
            $scope.showLoading($ionicLoading);
            promise.then(function(results, err) {
                    if (!err) {
                        $scope.posts = results;
                        //console.log('results is', results);
                    } else {
                        $scope.log('error is', err);
                    }
                })
                .finally(function($ionicLoading) {
                    //hide the loading
                    $scope.hideLoading($ionicLoading);
                });
        }
    }
})();
