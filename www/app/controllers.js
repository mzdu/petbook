/* global angular, document, window */
'use strict';

angular.module('petBook.controllers', [])

.controller('AppCtrl', function($rootScope, $scope, $ionicModal, $ionicPopover, $timeout, StorageService,$state, $ionicPopup, $ionicLoading) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    $scope.isWebView = ionic.Platform.isWebView();
    $scope.isIPad = ionic.Platform.isIPad();
    $scope.isIOS = ionic.Platform.isIOS();
    $scope.isAndroid = ionic.Platform.isAndroid();
    $scope.isWindowsPhone = ionic.Platform.isWindowsPhone();
    $scope.currentPlatform = ionic.Platform.platform();

    console.log('$scope.currentPlatform = ', $scope.currentPlatform);

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
    //for loading screens
    $scope.showLoading = function() {
        $ionicLoading.show({
          template: '<p style="color:#0a9ec7">Loading...</p><ion-spinner icon="bubbles" class="spinner-calm"></ion-spinner>'
        });
    };

    $scope.hideLoading = function(){
        $ionicLoading.hide();
    };
})

.controller('IntroCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.hideNavBar();
    $scope.$parent.hideHeader();
    $scope.$parent.clearFabs();
    //$scope.$parent.setHeaderFab('right');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
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
    $scope.user.avatar='';
    //console.log('scope user is ', $scope.user);

    $scope.field = $stateParams.field;
    if($scope.field === 'dob'){
        
        $scope.value = new Date($stateParams.value);
    }else{
        $scope.value = $stateParams.value;
    }
    console.log('$scope.field = ', $scope.field);
    console.log('$scope.value = ', $scope.value);
    if($scope.field && $scope.value){
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
/*
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
                $scope.user.pet.dob = new Date($scope.user.pet.dob);
                //console.log($scope.user.pet);
                var feedback = ProfileService.update($scope.user.pet);
              } 
            });
        }

        // do what you want to do
        
        console.log('scope editMode', $scope.editMode);
        console.log('user obj is', $scope.user);
        console.log('pet obj is', $scope.user.pet);
        
        
        // $timeout(function() {console.log('hahahaha')}, 100);       
    });
*/


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


.controller('MomentsCtrl', function($scope, $state, $cordovaToast, $stateParams, $timeout, StorageService, ionicMaterialMotion, ionicMaterialInk, StatusService, LocationService, $ionicLoading) {
    
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    $scope.isExpanded = true;

    var user = StorageService.getCurrentUser().user;
    
    LocationService.getCurrentLocation().then(function(loc){
        // $scope.location = loc;
        //console.log('location is: ', loc);
        var moment = {
            "userID": user._id,
            "location": loc,
            "rad": 10
        };

        $scope.showLoading($ionicLoading);
        var promise = StatusService.getMoments(moment);
        promise.then(function(results, err) {
            if (!err) {
                $scope.posts = results;
                //console.log('posts are: ', $scope.posts);
                $scope.likes = results.likedBy;
            } else {
                $scope.log('error is', err);
            }
        })
        .finally(function($ionicLoading) {
            //hide the loading
            $scope.hideLoading($ionicLoading);
        });

    });

    // $timeout(function() {
    //     ionicMaterialMotion.fadeSlideIn({
    //         selector: '.animate-fade-slide-in .item'
    //     });
    // }, 1200);

    // // Activate ink for controller
    // ionicMaterialInk.displayEffect();


     
})

.controller('FriendInfoCtrl', function($scope, $state, $stateParams, ProfileService) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    var userID = $stateParams.userID;
    if(userID){
        var promise = ProfileService.get(userID);
        promise.then(function(data){
            if(data){
                $scope.user = data;
            }
        });
    }
})

.controller('EditProfileCtrl', function($scope, $state, $stateParams, ProfileService, StorageService, $ionicLoading, $cordovaImagePicker, $ionicPlatform, $cordovaFileTransfer) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    $scope.leftButtons = [
      {
        type: 'button-positive',
        content: '<i class="icon ion-navicon"></i>',
        tap: function(e) {
        }
      }
    ];

    $scope.field = $stateParams.field;
    if($scope.field === 'dob'){
        $scope.value = new Date($stateParams.value);
        
    }else{
        $scope.value = $stateParams.value;
    }
    $scope.pet = {};
    $scope.user = StorageService.getCurrentUser().user;
    $scope.user.avatar = '';

    $scope.pet[$scope.field] = $scope.value;

    /*console.log('scope.pet is: ', $scope.pet);

    console.log('$scope.field = ', $scope.field);    
    console.log('the value is: ', $scope.value);*/

    $scope.save = function(pet){
        var user = StorageService.getCurrentUser().user;
        pet._id = user._id;
        var promise = ProfileService.update(pet);
        $scope.showLoading($ionicLoading);
        promise.then(function(response){
            if(response){
                $state.go('app.profile', {field: $scope.field, value: pet[$scope.field]});
            }
        })
        .finally(function($ionicLoading) {
                    //hide the loading
                    $scope.hideLoading($ionicLoading);
        });

    }

    $scope.cancel = function(){
        $scope.pet = {};
        $scope.user.avatar='';
        $state.go('app.profile');
    }

    //upload selected avatar image to AWS; not finished yet
    $scope.upload = function(){
        var options = {
            fileKey: "avatar",
            fileName: "avatar",
            chunkedMode: false,
            mimeType: "image/png"
        };
        //$cordovaFileTransfer.upload("http://192.168.56.1:1337/file/upload", "img/care1.png", options)

    }
    //console.log('in edit profile ctrl');

    //choose a photo for avatar; the avatar's uri is in $scope.user.avatar
    $scope.selectImage = function(){
        // Image picker will load images according to these settings
        var options = {
            maximumImagesCount: 1, // Max number of selected images
            width: 800,
            height: 800,
            quality: 80            // Higher is better
        };
     
        $cordovaImagePicker.getPictures(options).then(function (results) {
            // Loop through acquired images; if multiple images
            /*for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);   // Print image URI
            }*/
            //$scope.user.avatar = 'http://www.google.com/imgres?imgurl=http://animalia-life.com/data_images/dog/dog7.jpg&imgrefurl=http://animalia-life.com/dogs.html&h=2317&w=2121&tbnid=Q-QQDJH26K8rsM:&tbnh=186&tbnw=170&usg=__VEQGqVYJwWqvFCni6PQlaSmjXaw=&docid=QIa83ScG5OU-uM&itg=1';
            $scope.user.avatar = result[0];
            //the following is for testing local images
            //$scope.user.avatar = "img/arya.jpg";
            console.log('Image URI: '+result[0]);
        }, function(error) {
            console.log('Error: ' + JSON.stringify(error));    // In case of error
        });
    }
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

.controller('MyPostsCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, StorageService, StatusService, $ionicLoading) {
    // Set Header
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

    //  $timeout(function() {
    //     ionicMaterialMotion.fadeSlideIn({
    //         selector: '.animate-fade-slide-in .item'
    //     });
    // }, 1200);

    // // Activate ink for controller
    // ionicMaterialInk.displayEffect();
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

.controller('NewPostCtrl',function($scope,StorageService,StatusService,$state, LocationService, $ionicPopup, $ionicLoading){
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
            //console.log("data is ",$scope.data);
            $scope.showLoading($ionicLoading);
            
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
            })
            .finally(function($ionicLoading) {
                //hide the loading
                $scope.hideLoading($ionicLoading);
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
