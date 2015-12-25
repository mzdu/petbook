(function() {
    'use strict';

    angular.module('petBook.services.api.auth', [])

    .factory('AuthService', AuthService)

    function AuthService(Restangular) {

        return {
 
            // POST: /api/login
            // logs the user in
            login: function(form) {
                return Restangular.all('login').post(form);
            },
            // POST: /api/register
            // registers the user
            register: function(form) {
                return Restangular.all('register').post(form);
            },
             // POST: /api/auth/forgotAndResetPassword
            // sends temporary password to user's email
            forgotPassword: function(form) {
                return Restangular.all('auth').all('forgotAndResetPassword').post(form);
            },
            // POST: /api/auth/changepassword
            // change user password
            changePassword: function(form) {
                return Restangular.all('auth').customPOST(form, 'changePassword');
            },
        }; //end of return
    };

})();