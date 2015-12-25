(function() {
    'use strict';

    angular
        .module('petBook.moment.directives', [])
        .directive('petbookMoment', petbookMoment);

    petbookMoment.$inject = ['StorageService', 'StatusService', 'ionicMaterialInk', 'ionicMaterialMotion', '$timeout', '$cordovaToast'];

    /* @ngInject */
    function petbookMoment(StorageService, StatusService, ionicMaterialInk, ionicMaterialMotion, $timeout, $cordovaToast) {
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
                nextPage: '&',
                cardType: '@'
            },
            templateUrl: 'app/moment/moment.directive.view.html'
        };
        return directive;

        function link(scope, element, attrs) {}
    }

    /* @ngInject */
    function PetBookMomentController($scope, $state, $stateParams, ionicMaterialInk, ionicMaterialMotion, $timeout, StorageService, StatusService, $cordovaToast, $ionicActionSheet, $ionicPopup) {
            var vm = this;

            vm.getLikes = getLikes;
            // vm.updateLike = updateLike;
            vm.hasUserAlreadyVotedOnPost = hasUserAlreadyVotedOnPost;
            vm.isExpanded = false;
            vm.clickedLike = clickedLike;
            vm.checkFriendInfo = checkFriendInfo;
            vm.getTimeSpan = getTimeSpan;
            $scope.likes = 0;
            vm.getComments = getComments;
            vm.addComment = addComment;
            vm.hasRendered = false;
            vm.hasMoreData = false; //for the infinite scroll
            vm.noDataMsg = null;
            vm.total = 0;
            vm.getHasMoreData = getHasMoreData;

            var user = StorageService.getCurrentUser().user;
            //console.log('user is: ', user);
            $scope.$watch('vm.posts', function(data, data2) {
                if (data && !vm.hasRendered) {

                    $timeout(function() {
                        ionicMaterialMotion.fadeSlideIn({
                            selector: '.animate-fade-slide-in .item'
                        });
                    }, 200);

                    // Set Ink
                    ionicMaterialInk.displayEffect();
                    vm.hasRendered = true;
                    getHasMoreData();
                }
                //< 25 records means we are on the last page and we can disable infinite scroll.


            });

            // Set Motion

            //console.log('vm.cardType = ', vm.cardType);

            if (vm.cardType === 'myPosts') {
                //console.log('enter myposts');
                vm.showProfileAvatar = false;
                vm.showPostAvatar = true;
                vm.noDataMsg = 'You have not created any posts yet. Click on the plus button at the bottom right to get started.';
            } else {
                //console.log('enter moments');
                vm.showProfileAvatar = false;
                vm.showPostAvatar = true;
                vm.noDataMsg = 'There are no moments within 10 miles of your location or your GPS is disabled.';
            }

            function getLikes(post, $event) {
                if (post.likedBy && post.likedBy.length) {
                    return post.likedBy.length;
                } else {
                    return 0;
                }
            }

            function getHasMoreData() {
                if (vm.posts.length > vm.total) {
                    vm.total += Math.min(15, vm.posts.length - vm.total);
                    vm.hasMoreData = true;
                } else {
                    vm.hasMoreData = false;
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');


            }

            function removeUserVoteOnClient(post) {
                for (var i = post.likedBy.length; i--;) {
                    if (post.likedBy[i] === user._id) {
                        post.likedBy.splice(i, 1);
                    }
                }
            }

            function addUserVoteOnClient(post) {
                if (!post.likedBy) {
                    post.likedBy = [];
                }
                post.likedBy.push(user._id);
            }


            function hasUserAlreadyVotedOnPost(post) {
                if (!post.likedBy) {
                    return false;
                }
                return _.find(post.likedBy, function(item) {
                    return item == user._id;
                });
            }

            function clickedLike(post, $event) {
                //console.log('clicked like');
                var user = StorageService.getCurrentUser().user;

                //find out if like button is now liked or disliked. 
                if (hasUserAlreadyVotedOnPost(post)) {
                    removeUserVoteOnClient(post);
                    StatusService.minusLike(post._id, user._id)
                        .then(function(data) {
                            console.log('removed user like', data);
                        });
                } else {
                    addUserVoteOnClient(post);
                    StatusService.addLike(post._id, user._id)
                        .then(function(data) {
                            console.log('added user like', data);
                        });
                }
            }

            function checkFriendInfo(post) {

                /*console.log(post._Owner);
                console.log(post._Owner._id);
                console.log(user);*/
                //for moments page, _Owner is a user, 
                //for my posts page, _Owner is a user id
                if (user._id == post._Owner || user._id == post._Owner._id) {
                    $state.go('app.profile');
                } else {
                    $state.go('app.friendinfo', {
                        userID: post._Owner._id
                    });
                }
            };


            function getComments(post) {
                return post.comments
            };

            function addComment(post) {

                $ionicActionSheet.show({
                    titleText: '',
                    buttons: [{
                        text: '<i class="icon ion-share"></i> Add Comment'
                    }, ],

                    //            destructiveText: 'POST',
                    cancelText: 'Cancel',
                    cancel: function() {
                        //              console.log('CANCELLED');
                    },
                    buttonClicked: function(index) {
                        $scope.data = {};
                        var myPopup = $ionicPopup.show({
                            template: '<input type="text" ng-model="data.comment">',
                            title: 'Enter your comment',
                            // subTitle: 'Please use normal things',
                            scope: $scope,
                            buttons: [{
                                text: 'Quit'
                            }, {
                                text: '<b>Ok</b>',
                                type: 'button-positive',
                                onTap: function(e) {
                                    if ($scope.data.comment) {
                                        console.log('$scope.data.comment =', $scope.data.comment);
                                        var comment = {
                                            comment: $scope.data.comment
                                        }

                                        var userID = user._id;
                                        var statusID = post._id;

                                        var promise = StatusService.addComment(statusID, userID, comment);

                                        promise.then(function(data, error) {
                                            if (data) {
                                                var newComment = {
                                                    _id: data.comments[data.comments.length-1],
                                                    comment: $scope.data.comment,
                                                    commentBy: {
                                                        _id: user._id,
                                                        username: user.username
                                                    },
                                                    createdDate: Date()
                                                };
                                                post.comments.push(newComment);
                                                $cordovaToast.showShortTop('Comment successfully added').then(function(success) {
                                                    // success
                                                }, function(error) {
                                                    // error
                                                });
                                            }

                                        });
                                    }
                                }
                            }]
                        });

                        myPopup.then(function(res) {
                            console.log('Tapped!', res);
                        });

                        return true;
                    },
                    //            destructiveButtonClicked: function() {
                    //              console.log('DESTRUCT');
                    //              return true;
                    //            }
                });

            };

            function getTimeSpan(post) {
                var createdDate = moment(post.createdDate);
                var currentDate = moment();
                return createdDate.from(currentDate);
            };


        } //end of moment ctrl


})();
