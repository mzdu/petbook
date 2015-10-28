/* global angular, document, window */
'use strict';

angular.module('petBook.controllers', [])

.controller('AppCtrl', function($rootScope, $scope, $ionicModal, $ionicPopover, $timeout, StorageService,$state, $ionicPopup) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
 
    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };

    $scope.logout = function() {
        /*StorageService.resetCurrentUser();
        $state.go('app.login');*/
        var confirmPopup = $ionicPopup.confirm({
         title: 'Confirmation',
         template: 'Are you sure you want to log out?',
         okText: '<i class="icon ion-checkmark-round"></i>',
         cancelText: '<i class="icon ion-close-round"></i>'
       });
       confirmPopup.then(function(res) {
         if(res) {
           StorageService.resetCurrentUser();
           $state.go('app.login');
           console.log('You are sure');
         } else {
           console.log('You are not sure');
         }
       }); 
    };
})

.controller('LoginCtrl', function($scope, $state, $timeout, $stateParams, StorageService, ionicMaterialInk, AuthService, $ionicSideMenuDelegate) {

	$ionicSideMenuDelegate.canDragContent(false)
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();

    //redirects the user to homepage if they are already logged in

    // if(StorageService.getCurrentUser()){
    //     $state.go('app.moments');
    // }

    // $scope.user = {
    //     username: "testuser",
    //     password: "test123"
    // }
  
    $scope.login = function() {

        var promise = AuthService.login($scope.user);
        promise.then(function(user, err) {
            // console.log('user is: ', user);
            // returns a list of users
            console.log('user is: ', user);
            if (!err && user.token) {
                StorageService.setCurrentUser(user);
                $state.go('app.moments');
            } else {
                console.log('error is: ', err);
                $scope.error = err;
            }
            return;
        }, function(response) {
            console.log('error login!');
            $scope.error = 'invalid credentials';
        }); //end of then

        //        $state.go('app.home');

    };

    $scope.register = function() {
        $state.go('app.register');
    };

})

.controller('RegisterCtrl', function($scope, $state, $timeout, $stateParams, StorageService, ionicMaterialInk, AuthService, $ionicSideMenuDelegate) {

	$ionicSideMenuDelegate.canDragContent(false)
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();

    $scope.user = {};

    $scope.Register = function() {

        console.log('scope user is: ', $scope.user);
        var promise = AuthService.register($scope.user);
        promise.then(function(user, err) {
            // returns a list of users
            if (!err) {
                console.log('user is: ', user);
                StorageService.setCurrentUser(user);
                $state.go('app.profile', {}, {
                    reload: true
                });
            } else {
                console.log('error is: ', err);
                $scope.error = 'unable to sign up at this time';
            }
        }); //end of then
    }; // end of sign up   
    
    $scope.login = function() {
        $state.go('app.login');
    }; 
})

.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, StorageService, ProfileService, $ionicPopup) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    // $scope.isExpanded = false;
    // $scope.$parent.setExpanded(false);
    // $scope.$parent.setHeaderFab(false);
    $scope.user = StorageService.getCurrentUser().user;
    //console.log('scope user is ', $scope.user);

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

    $scope.$on('toggleEdit', function(event, data) {
        //console.log('test received', data);
        $scope.editMode = data;

        //console.log('editmode is', $scope.editMode);

        if (!$scope.editMode) {
            var confirmPopup = $ionicPopup.confirm({
             title: 'Confirmation',
             template: 'Are you sure you want to save it?',
             okText: '<i class="icon ion-checkmark-round"></i>',
             cancelText: '<i class="icon ion-close-round"></i>'
           });
           confirmPopup.then(function(res) {
             if(res) {
                $scope.user.pet._id = $scope.user._id;
                var feedback = ProfileService.update($scope.user.pet);
              } 
            });
        }

        // do what you want to do
        
        /*console.log('scope editMode', $scope.editMode);
        console.log('user obj is', $scope.user);
        console.log('pet obj is', $scope.user.pet);*/
        
        
        // $timeout(function() {console.log('hahahaha')}, 100);       
    });


    // A confirm dialog
/*         $scope.showConfirm = function() {
           var confirmPopup = $ionicPopup.confirm({
             title: 'Confirmation',
             template: 'Are you sure you want to save it?'
           });
           confirmPopup.then(function(res) {
             if(res) {
               
             } else {
               
             }
           });
         };  */   
})



.controller('MomentsCtrl', function($scope, $state, $cordovaToast, $stateParams, $timeout, StorageService, ionicMaterialMotion, ionicMaterialInk, StatusService, LocationService) {
    
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.getLikes = getLikes;

    $scope.clickedLike = function(post){
        console.log('clicked like');
        var user = StorageService.getCurrentUser().user;
        
        if(updateLike(post)){
             var promise = StatusService.addLike(post._id, user._id);
                promise.then(function(data){
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

        //      $cordovaToast.show(message, duration, location).then(function(success) {
        //     console.log("You have already voted!");
        // }, function (error) {
        //     console.log("The toast was not shown due to " + error);
        // });

        }
    };
    // $timeout(function() {
    //     ionicMaterialMotion.fadeSlideIn({
    //         selector: '.animate-fade-slide-in .item'
    //     });
    // }, 200);

    var user = StorageService.getCurrentUser().user;

    
    LocationService.getCurrentLocation().then(function(loc){
        // $scope.location = loc;
        console.log('location is: ', loc);
         var moment = {
            "userID": user._id,
            "location": loc,
            "rad": 10
        };

        var promise = StatusService.getMoments(moment);
        promise.then(function(results, err) {
            if (!err) {
                $scope.posts = results;
                $scope.likes = results.likedBy
            } else {
                $scope.log('error is', err);
            }
        });

    });


        $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);


    // Activate ink for controller
    ionicMaterialInk.displayEffect();


    function getLikes(post){
        if(post.likedBy && post.likedBy.length){
            return post.likedBy.length;
        } else {
            return 0;
        }
    }

    function hasUserAlreadyVotedOnPost(post){
        return _.find(post.likedBy, function(item){
                return item == user._id; 
            });
    }

    //update the like count locally and prevents user from liking a post a second time.
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

    $scope.checkFriendInfo = function(post){
        //console.log(post._Owner._id);
        $state.go('app.friendinfo',{
            userID: post._Owner._id
        });
    };

})

.controller('FriendInfoCtrl', function($scope, $state, $stateParams) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    $scope.userID = $stateParams.userID;
    
})


.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

.controller('MyPostsCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, StorageService, StatusService) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);


  
    /*    [{description: 'wishing my dad were home',
           likes: 10,
           createdDate: '8/29/15',
           location: [51.5033630,-0.1276250]},
        {description: 'that really itches',
           likes: 10,
           createdDate: '8/30/15',
           location: [51.5033630,-0.1276250]},
        {description: 'need someone to walk me',
           likes: 10,
           createdDate: '8/31/15',
           location: [51.5033630,-0.1276250]}];*/

    if (!StorageService.getCurrentUser()) {
        return;
    } else {
        $scope.user = StorageService.getCurrentUser().user;
        var promise = StatusService.getAll($scope.user._id);
        // console.log(promise);
        // $scope.posts

        promise.then(function(results, err) {
            if (!err) {
                $scope.posts = results;
                // console.log('likes is', $scope.sth);
            } else {
                $scope.log('error is', err);
            }
        })
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
})

.controller('AddPostsCtrl', function($scope, $state){ //, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, StorageService, $ionicPopup, StatusService, LocationService) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.showPopup = function() {
        $state.go('app.newpost');
    }
    /* //testing data
    $scope.posts = [{
        description: 'wishing my dad were home',
        likes: 10,
        createdDate: '8/29/15',
        location: [51.5033630, -0.1276250]
    }, {
        description: 'that really itches',
        likes: 10,
        createdDate: '8/30/15',
        location: [51.5033630, -0.1276250]
    }, {
        description: 'need someone to walk me',
        likes: 10,
        createdDate: '8/31/15',
        location: [51.5033630, -0.1276250]
<<<<<<< HEAD
    }];

    LocationService.getCurrentLocation().then(function(loc){
        $scope.location = loc;
        console.log('location is: ', loc);
    });


=======
    }];*/
    /*
    $scope.user = StorageService.getCurrentUser().user;

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



    //data ={choice: one of the fixed option, t1: addtional text entered}, so the status should be the contatenation of them (add space between them).
    //if a user select other, notice choice=" "; need to remove it before store it.

    $scope.data={};
    $scope.formtemplate = '<ion-radio ng-model="data.choice" ng-value="\'My dog needs playmates!\'">playmates!</ion-radio><ion-radio ng-model="data.choice" ng-value="\'My dog needs medical advice.\'">medical advice.</ion-radio><ion-radio ng-model="data.choice" ng-value="\'My dog needs to take a shower.\'">to take a shower.</ion-radio><ion-radio ng-model="data.choice" ng-value="\'My dog needs a walk.\'">a walk.</ion-radio><ion-radio ng-model="data.choice" ng-value="\'My dog needs dog sitting/boarding.\'">dog sitting/boarding.</ion-radio><ion-radio ng-model="data.choice" ng-value="\' \'">other.</ion-radio><strong>Enter extra text below:</strong><br/><input type="text" ng-model="data.t1">';
    
    //this is the status the customer will send!!!
    $scope.userInput = "";
  
    $scope.showPopup = function() {
        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: $scope.formtemplate,
            title: 'My Dog Needs',
            //subTitle: 'Please use normal things',
            scope: $scope,
            buttons: [{
                text: '<i class="icon ion-close-round"></i>'
            }, {
                text: '<i class="icon ion-checkmark-round"></i>',
                type: 'button-assertive',
                onTap: function(e) {
                    if (!$scope.data.choice) {
                        //don't allow the user to close unless he enters wifi password
                        e.preventDefault();
                    } else {
                        return $scope.data;
                    }
                }
            }]
        });

        myPopup.then(function(res) {
                console.log('Tapped!', res);
                $scope.userInput = "";
                if ($scope.data.choice == " ") {
                    $scope.data.choice = "";
                }
                if ($scope.data.choice != "") {
                    $scope.userInput = $scope.data.choice + " ";
                }
                if ($scope.data.t1 != undefined) {
                    $scope.userInput = $scope.userInput + $scope.data.t1;
                }

                console.log("result=", $scope.userInput);
                var status = {
                    description: $scope.userInput,
                    likes: 5,
                    location: $scope.location //hard coded
                }
                var promise = StatusService.add($scope.user._id, status);

                promise.then(function(data, error) {
                    if (!error) {
                        console.log('added data is: ', data);
                        console.log('wish successfully added');
                        //$state.reload();

                    } else {
                        console.log('error adding wish');
                    }
                }, function(response) {
                    console.log('response error ', response);
                });

            });
    */
    /*$timeout(function() {
       myPopup.close(); //close the popup after 3 seconds for some reason
    }, 8000);*/
})

.controller('NewPostCtrl',function($scope,StorageService,StatusService,$state, LocationService, $ionicPopup){
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.data = {};
    $scope.user = StorageService.getCurrentUser().user;
    
    $scope.choiceList = [
    { text: "playmates!", value: "playmates!" },
    { text: "medical advice.", value: "medical advice." },
    { text: "to take a shower.", value: "to take a shower." },
    { text: "a walk.", value: "a walk." },
    { text: "dog sitting/boarding.", value: "dog sitting/boarding." },
    { text: "other:", value: "other" }
    ];

     LocationService.getCurrentLocation().then(function(loc){
        $scope.location = loc;
        console.log('location is: ', loc);
    });

    $scope.addPost = function(){
        $scope.data.userInput = "";
        if($scope.data.choice != "other" && $scope.data.choice != undefined){
            $scope.data.userInput = "My dog needs " + $scope.data.choice;
        }
        if($scope.data.post != undefined){
            if($scope.data.userInput != "") {
                $scope.data.userInput = $scope.data.userInput + " ";
            }
            $scope.data.userInput = $scope.data.userInput + $scope.data.post;
        }
        if( ($scope.data.choice == "other" || $scope.data.choice == undefined) && $scope.data.post == undefined){
            var alertPopup = $ionicPopup.alert({
             title: 'Alert',
             template: 'You need to select a choice or enter some text.'
            });
            alertPopup.then(function(res) {
             console.log('Try select or enter again.');
            });
        }else{
            console.log("data is ",$scope.data);

            var status = {
                description: $scope.data.userInput,
                likes: 5,
                location: $scope.location //hard coded
            }
            var promise = StatusService.add($scope.user._id, status);

            promise.then(function(data, error) {
                if (!error) {
                    console.log('added data is: ', data);
                    console.log('wish successfully added');
                    //$state.reload();
                    $state.go('app.myposts');

                } else {
                    console.log('error adding wish');
                }
            }, function(response) {
                console.log('response error ', response);
            });
        }
    }
})
/*.controller('PetsNearbyCtrl', ['$scope', function ($scope) {
    
}])
*/
.controller('AboutCtrl', function($scope){

})

;
