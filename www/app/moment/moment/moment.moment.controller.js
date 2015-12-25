(function() {
    'use strict';

    angular
        .module('petBook.moment.moment.controller', [])
        .controller('MomentsCtrl', MomentsCtrl);

    MomentsCtrl.$inject = ['$scope', '$state', '$cordovaToast', '$ionicPlatform', '$stateParams', '$timeout', 'StorageService', 'ionicMaterialMotion', 'ionicMaterialInk', 'StatusService', 'LocationService', '$ionicLoading'];

    /* @ngInject */
    function MomentsCtrl($scope, $state, $cordovaToast, $ionicPlatform, $stateParams, $timeout, StorageService, ionicMaterialMotion, ionicMaterialInk, StatusService, LocationService, $ionicLoading) {
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab('right');
        $scope.isExpanded = true;
        $scope.loadMoreData = loadMoreData;

        var user = StorageService.getCurrentUser().user;

        var moment = {
            "userID": user._id
        };

        $ionicPlatform.ready(function() {
            $scope.showLoading($ionicLoading);
            LocationService.getCurrentLocation().then(function(loc) {

                moment.location = loc;
                moment.rad = 10;
                loadMoments();


            }, function(error) {
                loadMoments();
            });

        });

        function loadMoments() {
            var promise = StatusService.getMoments(moment);
            promise.then(attachMoments, errorHandler)
                .finally(function($ionicLoading) {
                    //hide the loading
                    $scope.hideLoading($ionicLoading);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
        }

        function loadMoreData() {
            moment.offSet = $scope.posts.length;
            loadMoments();
        }


        function attachMoments(results, err) {
            // $scope.showInfiniteScroll = true;
            if (!err) {
                // $scope.showInfiniteScroll = (results.length > 0) ? true : false;
                if (!$scope.posts) {
                    $scope.posts = results;
                } else {
                    $timeout(function() {
                        _.each(results, function(item) {
                            $scope.posts.push(item)
                        });
                    })

                    // $scope.posts = copy;

                    $scope.likes = results.likedBy;

                }

            } else {
                $scope.log('error is', err);
            }

        }

        function errorHandler() {
            console.log('in error handler');
            $scope.hideLoading($ionicLoading);
        }
    }
})();
