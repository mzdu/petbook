(function() {
    'use strict';

    angular.module('petBook.services.api.status', [])

    .factory('StatusService', StatusService)
   
     function StatusService(Restangular) {

         return {
             // GET: /status/:userID
             // returns all posts from current user
             getAll: function(userID) {
                 return Restangular.all('status').one('', userID).get();
             },
              // Post: /status/:userID
             // creates a status for user
             add: function(id, status){
                return Restangular.all('status').one('', id).customPOST(status);
             },

             getMoments: function(form){
            	console.log('getMoments is running');
                return Restangular.all('status').post(form);
             },

             addLike: function(statusID, userID){
                return Restangular.all('status').one('', statusID).one('likes', userID).post();
             },

             minusLike: function(statusID, userID){
                return Restangular.all('status').one('', statusID).one('disLikes', userID).post();  
             },
             addComment: function(statusID, userID, comment){
                 return Restangular.all('status').one('', statusID).one('comment', userID).customPOST(comment);
             },

         }; //end of return
     };  

})();