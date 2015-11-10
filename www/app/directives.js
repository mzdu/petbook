(function() {
    'use strict';

    angular
        .module('petBook.directives', [])
        .directive('petbookMoment', petbookMoment);

    petbookMoment.$inject = ['StorageService', 'StatusService', 'ionicMaterialInk', 'ionicMaterialMotion', '$timeout', '$cordovaToast'];

    /* @ngInject */
    function petbookMoment(StorageService, StatusService, ionicMaterialInk, ionicMaterialMotion, $timeout, $cordovaToast)  {
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
    function PetBookMomentController($scope, $state, $stateParams, ionicMaterialInk, ionicMaterialMotion, $timeout, StorageService, StatusService, $cordovaToast) {
        var vm = this;
        vm.getLikes = getLikes; 
        vm.updateLike = updateLike;
        vm.isExpanded = false;
        vm.clickedLike = clickedLike;
        vm.checkFriendInfo = checkFriendInfo;
        
        vm.getComments = getComments;
        vm.addComment = addComment;

        var user = StorageService.getCurrentUser().user;
        console.log('user is: ', user);
        $scope.$watch('vm.posts', function(data, data2) {
        if (data) {
            console.log('got data', data);

            $timeout(function() {
                ionicMaterialMotion.fadeSlideIn({
                    selector: '.animate-fade-slide-in .item'
                });
            }, 200);
            // Set Ink
            ionicMaterialInk.displayEffect();
        }

        });

        // Set Motion
       
        console.log('vm.cardType = ', vm.cardType);

        if(vm.cardType === 'myPosts'){
            //console.log('enter myposts');
            vm.showProfileAvatar = false;
            vm.showPostAvatar = true;
        } else {
            //console.log('enter moments');
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

        function checkFriendInfo(post){
           
           /*console.log(post._Owner);
           console.log(post._Owner._id);
           console.log(user);*/
           //for moments page, _Owner is a user, 
           //for my posts page, _Owner is a user id
           if(user._id == post._Owner || user._id == post._Owner._id){
                $state.go('app.profile');
           }else{
                $state.go('app.friendinfo',{
                    userID: post._Owner._id
                });
            }
         };
         
         
         function getComments(post){
        	 return post.comments
         };
         
         function addComment(post){
        	 
        	 // add a comment and save it
        	 return 
         };

        
    } //end of moment ctrl


})();