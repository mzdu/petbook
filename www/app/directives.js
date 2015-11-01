(function() {
    'use strict';

    angular
        .module('petBook.directives', [])
        .directive('petbookMoment', petbookMoment);

    petbookMoment.$inject = ['StorageService', 'StatusService', 'ionicMaterialInk', 'ionicMaterialMotion', '$timeout'];

    /* @ngInject */
    function petbookMoment(StorageService, StatusService, ionicMaterialInk, ionicMaterialMotion, $timeout)  {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: PetBookMomentController,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
                posts: '=',
                cardType: '@'
            },
            templateUrl: 'templates/petbook_moment.html'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

    /* @ngInject */
    function PetBookMomentController($scope, ionicMaterialInk, ionicMaterialMotion, $timeout, StorageService, StatusService) {
        var vm = this;
        vm.getLikes = getLikes; 
        vm.updateLike = updateLike;
        vm.isExpanded = false;
        vm.clickedLike = clickedLike;

        var user = StorageService.getCurrentUser();
        $scope.$watch('PetBookMomentController.posts', function(data) {
            if (data) {
                // $timeout(function() {
                //     ionicMaterialMotion.slideUp({
                //         selector: '.slide-up'
                //     });
                // }, 2000);

                // $timeout(function() {
                //     ionicMaterialMotion.fadeSlideInRight({
                //         startVelocity: 3000
                //     });
                // }, 2000);


                // Set Ink
                // ionicMaterialInk.displayEffect();
            }
        });

        // Set Motion
       
        console.log('vm.cardType = ', vm.cardType);

        if(vm.cardType === 'myPosts'){
            vm.showProfileAvatar = true;
            vm.showPostAvatar = false;
        } else {
            vm.showProfileAvatar = false;
            vm.showPostAvatar = true;
        }


        function getLikes(post){
            if(post.likedBy && post.likedBy.length){
                return post.likedBy.length;
            } else {
                return 0;
            }
        }

        function updateLike(post){
            if(!post.likedBy){
                post.likedBy = [];
                post.likedBy.push(user._id);
                return true;
            } else {
                if(hasUserAlreadyVotedOnPost(post)){
                    console.log('you already voted');
                    return false;
                } else {
                    post.likedBy.push(user._id);
                    return true;
                }
            }
        }

        function hasUserAlreadyVotedOnPost(post) {
            return _.find(post.likedBy, function(item) {
                return item == user._id;
            });
        }

        function clickedLike(post) {
            console.log('clicked like');
            var user = StorageService.getCurrentUser().user;

            if (updateLike(post)) {
                var promise = StatusService.addLike(post._id, user._id);
                promise.then(function(data) {
                    console.log('successfully updated like');
                });
            } else {
                //   var showError = $ionicPopup.show({
                //   title: 'Error:',
                //   template: 'You have already voted',
                //   okText: '<i class="icon ion-checkmark-round"></i>',
                // });
                // showError.then(function(res) {
                //   console.log('dialog shown');
                //  });
                var message = 'You have already voted!';
                $cordovaToast.show(message, 'short', 'bottom').then(function(success) {
                    console.log(message);
                }, function(error) {
                    console.log("The toast was not shown due to " + error);
                });

            }
        };


        
    } //end of moment ctrl


})();