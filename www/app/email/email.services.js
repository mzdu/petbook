(function() {
    'use strict';

    angular.module('petBook.email.services', [])

    .factory('EmailService', EmailService);

    function EmailService(Restangular) {

         return {
             // POST: api/emails/signup/:userID
             // send confirmation email
             email: function(form) {
                 return Restangular.all('email').one('', form._id).customPOST(form);
             },
         }; //end of return
     };
})();