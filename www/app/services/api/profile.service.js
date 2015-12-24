(function() {
    'use strict';

    angular.module('petBook.services.api.profile', [])

    .factory('ProfileService', ProfileService)
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
})();