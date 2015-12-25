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
            // POST: /api/user/isEmailUnique
            // check if email is unique
            isEmailUnique: function(form){
                return Restangular.all('user').customPOST(form, 'isEmailUnique');
            },
            // POST: /api/user/isUserNameUnique
            // check if user name is unique
            isUserNameUnique: function(form){
                return Restangular.all('user').customPOST(form, 'isUserNameUnique');
            }
        }; //end of return
    };

})();