// Ionic petBook App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'petBook' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'petBook.controllers' is found in controllers.js

angular.module('petBook', ['ionic', 
    'ngCordova',
    'petBook.controllers',
    'petBook.directives',
    'petBook.services',
    'restangular',
    'ngStorage', 
    'ionic-material', 
    'ionMdInput'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, RestangularProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */
    RestangularProvider.setDefaultHeaders({
        'Content-Type': 'application/json'
    });

//    RestangularProvider.setBaseUrl('http://localhost:8080/api');	
    RestangularProvider.setBaseUrl('https://petbookapi.herokuapp.com/api'); 

    
    
    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.moments', {
        url: '/moments',
        views: {
            'menuContent': {
                templateUrl: 'templates/moments.html',
                controller: 'MomentsCtrl'
            },
             'fabContent': {
                template: ''
            }
        }
    })

    .state('app.friendinfo', {
        url: '/friendinfo/:userID',
        // params: {userID: null},
        
        views: {
            'menuContent': {
                templateUrl: 'templates/friendinfo.html',
                controller: 'FriendInfoCtrl',


            }
        }
    })

    .state('app.friends', {
        url: '/friends',
        views: {
            'menuContent': {
                templateUrl: 'templates/friends.html',
                controller: 'FriendsCtrl'
            },
            'fabContent': {
                template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-friends').classList.toggle('on');
                    }, 900);
                }
            }
        }
    })

    .state('app.gallery', {
        url: '/gallery',
        views: {
            'menuContent': {
                templateUrl: 'templates/gallery.html',
                controller: 'GalleryCtrl'
            },
            'fabContent': {
                template: '<button id="fab-gallery" class="button button-fab button-fab-top-right expanded button-energized-900 drop"><i class="icon ion-heart"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-gallery').classList.toggle('on');
                    }, 600);
                }
            }
        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })
    
    .state('app.register', {
        url: '/register',
        views: {
            'menuContent': {
                templateUrl: 'templates/register.html',
                controller: 'RegisterCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })
    
    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            },
             'fabContent': {
                template: ''
            }          
        }
    })
    .state('app.profileblankinput', {
        url: '/profileblankinput',
        views: {
            'menuContent': {
                templateUrl: 'templates/profileblankinput.html',
                controller: 'ProfileBlankInputCtrl'
            }
        }
    })
    .state('app.profilebirthdayinput', {
        url: '/profilebirthdayinput',
        views: {
            'menuContent': {
                templateUrl: 'templates/profilebirthdayinput.html',
                controller: 'ProfileBirthdayInputCtrl'
            }
        }
    })
    .state('app.profilesexinput', {
        url: '/profilesexinput',
        views: {
            'menuContent': {
                templateUrl: 'templates/profilesexinput.html',
                controller: 'ProfileSexInputCtrl'
            }
        }
    })
    .state('app.myposts', {
        url: '/myposts',
        views: {
            'menuContent': {
                templateUrl: 'templates/myposts.html',
                controller: 'MyPostsCtrl'
            },
             'fabContent': {
                template: '<button id="fab-myposts" class="button button-fab button-fab-bottom-right button-energized-900" ng-click="showPopup()"><i class="icon ion-plus"></i></button>',
                controller: 'AddPostsCtrl'/*function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);
                }*/
            }
        }
    })
    .state('app.newpost',{
        url: '/newpost',
        views:{
            'menuContent':{
                templateUrl: 'templates/newpost.html',
                controller: 'NewPostCtrl'
            }
        },
         'fabContent': {
                template: ''
            }
    })
    .state('app.petsnearby', {
        url: '/petsnearby',
        views: {
            'menuContent': {
                templateUrl: 'templates/petsnearby.html',
                controller: 'PetsnearbyCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })
    .state('app.about', {
        url: '/about',
        views: {
            'menuContent': {
                templateUrl: 'templates/about.html',
                controller: 'AboutCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});
