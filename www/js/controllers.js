/* global angular, document, window */
'use strict';

angular.module('petBook.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout,StorageService) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;
    $scope.user = StorageService.getCurrentUser().user;


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
    
    $scope.logout=function(){

    };
})

.controller('LoginCtrl', function($scope, $state, $timeout, $stateParams, StorageService, ionicMaterialInk, AuthService) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
    
    $scope.user = {};
    $scope.login = function() {
  	  
        var promise = AuthService.login($scope.user);
        promise.then(function(user, err) {
            // console.log('user is: ', user);
            // returns a list of users
                console.log('user is: ', user);
            if (!err && user.token) {
               StorageService.setCurrentUser(user);
                $state.go('app.profile', {}, {
                    reload: true
                });
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

.controller('RegisterCtrl', function($scope, $state, $timeout, $stateParams, StorageService, ionicMaterialInk, AuthService) {

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

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, StorageService, ProfileService) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.user = StorageService.getCurrentUser().user;
    console.log('scope user is ', $scope.user);

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
        console.log('test received', data);
        $scope.editMode = data;
        // do what you want to do
        
        console.log('scope editMode', $scope.editMode);
        
        console.log('user obj is', $scope.user);
        console.log('pet obj is', $scope.user.pet);
        $scope.user.pet._id = $scope.user._id;
        var feedback = ProfileService.update($scope.user.pet);
    });
    
    
})


.controller('MomentsCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
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

.controller('MyPostsCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, StorageService) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.posts = 
        [{description: 'wishing my dad were home',
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
           location: [51.5033630,-0.1276250]}];
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
})

.controller('AddPostsCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, StorageService,$ionicPopup) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.posts = 
        [{description: 'wishing my dad were home',
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
           location: [51.5033630,-0.1276250]}];
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

 /*   $scope.formtemplate = '<div class="list">
              <label class="item item-radio">
                <input type="radio" name="group">
                <div class="item-content">
                  Go
                </div>
                <i class="radio-icon ion-checkmark"></i>
              </label>

              <label class="item item-radio">
                <input type="radio" name="group">
                <div class="item-content">
                  Not
                </div>
                <i class="radio-icon ion-checkmark"></i>
              </label>
            </div>
            <input type="text" ng-model="data.t1"> <br /> 
            <input type="text" ng-model="data.t2">';*/

    //data ={choice: one of the fixed option, t1: addtional text entered}, so the status should be the contatenation of them (add space between them).
    //if a user select other, notice choice=" "; need to remove it before store it.
    $scope.data={};
    $scope.formtemplate = '<strong>My dog needs (select below) *</strong> <ion-radio ng-model="data.choice" ng-value="\'My dog needs playmates!\'">playmates!</ion-radio><ion-radio ng-model="data.choice" ng-value="\'My dog needs medical advice.\'">medical advice.</ion-radio><ion-radio ng-model="data.choice" ng-value="\'My dog needs to take a shower.\'">to take a shower.</ion-radio><ion-radio ng-model="data.choice" ng-value="\'My dog needs a walk.\'">a walk.</ion-radio><ion-radio ng-model="data.choice" ng-value="\'My dog needs dog sitting/boarding.\'">dog sitting/boarding.</ion-radio><ion-radio ng-model="data.choice" ng-value="\' \'">other.</ion-radio><strong>Enter extra text below:</strong><br/><input type="text" ng-model="data.t1">';
    
    //this is the status the customer will send!!!
    $scope.userInput = "";

    // Triggered on a button click, or some other target
    $scope.showPopup = function() {  
      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: $scope.formtemplate,
        title: 'New Post',
        //subTitle: 'Please use normal things',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-assertive',
            onTap: function(e) {
              if (!$scope.data.choice) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                return $scope.data;
              }
            }
          }
        ]
      });

      myPopup.then(function(res) {
        console.log('Tapped!', res);
        $scope.userInput="";
        if($scope.data.choice==" "){
            $scope.data.choice="";
        }
        if($scope.data.choice!=""){
        $scope.userInput = $scope.data.choice+ " ";
        }
        if($scope.data.t1!=undefined){
            $scope.userInput =$scope.userInput + $scope.data.t1;
         }
        console.log("result=",$scope.userInput);
      });
      /*$timeout(function() {
         myPopup.close(); //close the popup after 3 seconds for some reason
      }, 8000);*/
     };


})
/*.controller('PetsNearbyCtrl', ['$scope', function ($scope) {
    
}])

.controller('AboutCtrl', ['$scope', function ($scope) {
    
}])
*/
;
