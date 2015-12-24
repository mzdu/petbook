(function() {
    'use strict';

    angular.module('petBook.services.utility.location', [])

    .factory('LocationService', LocationService);


     function StorageService($localStorage, $state) {
        // console.log('in storage service');
        return {
            getCurrentUser: function() {
                return $localStorage.user;
                
            },
           
            setCurrentUser: function(user) {
                $localStorage.user = user;
                console.log('setting current user to : ', user);
                //makes the token expire in 30 minutes x 24 = 12 hours
                $localStorage.user.exp = new Date().getTime() + 30 * 60000 * 24;
            },
            resetCurrentUser: function() {
                console.log('resetting current user...');
                $localStorage.user = '';
                //console.log('current user is ', $localStorage.user);
            },
        }; //end of return
    };
     
     
     function ProfileService(Restangular) {

         return {
             // GET: /pet
             // returns all pets
             all: function(form) {
                 return Restangular.all('pet').getList();
             },

             // Post: /pet/:petID
             // updates a single pet
             update: function(form) {
                 //console.log('form is', form);
                 return Restangular.all('pet').one('', form._id).customPOST(form);
             },

             // GET: /pet/:userID
             // returns a specific pet
             get: function(userID) {
                 return Restangular.one('pet', userID).get();
             }

         }; //end of return
     };       
     
 


function LocationService($q, $localStorage, $cordovaGeolocation) {

    

    return {
        getCurrentLocation: function() {
            console.log('in get current loc');
            var deferred = $q.defer();
           
                console.log('in get loc else');
                var geoLoc = [];

                var options = { timeout: 10000, enableHighAccuracy: true }; //this is needed to enable location on android
                // navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
                 $cordovaGeolocation
                 .getCurrentPosition(options)
                 .then(onSuccess, onError);


                function onSuccess(position) {
                    console.log('success');
                    geoLoc.push(position.coords.latitude);
                    geoLoc.push(position.coords.longitude);
                    $localStorage.location = geoLoc;
                    console.log('loc is: ' +  angular.toJson($localStorage.location));
                    deferred.resolve(geoLoc);
                };

                function onError(error) {
                    console.log('could not get location');
                    console.log(angular.toJson(error));
                    deferred.reject(error);
                };



            // }

            return deferred.promise;
        }
    }; //end of return
}

})();