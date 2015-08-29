(function() {
    'use strict';

    angular.module('petBook.services', [])

    .factory('AuthService', AuthService)
    .factory('StorageService', StorageService)
    .factory('ProfileService', ProfileService);

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

            forgotPassword: function(form) {
                return Restangular.all('auth').all('forgotPassword').post(form);
            },
            // POST: /api/auth/changepassword
            // change user password
            changePassword: function(form) {
                return Restangular.all('auth').customPOST(form, 'changePassword');
            },
        }; //end of return
    };
    

     function StorageService($localStorage, $state) {
        // console.log('in storage service');
        return {
            getCurrentUser: function(goToRegister) {
                var user = $localStorage.user;
                if (user && user.exp >= new Date()) {
                    // console.log('getting current user... ', $localStorage.user);
                    return user;
                } else {
                    // console.log('needs to login');
                    $localStorage.user = '';
                    // $state.go('login');
                    if (goToRegister) {
                        $state.go('register', {}, {
                            reload: true
                        });
                    } else {
                        $state.go('login', {}, {
                            reload: true
                        });
                    }
                    // console.log('after logged in');
                    return null;
                }
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
                console.log('current user is ', $localStorage.user);
            },
        }; //end of return
    }
     
     
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
                 console.log('form is', form);
                 return Restangular.all('pet').one('', form._id).customPOST(form);
             },

             // GET: /user/:petID
             // returns a specific pet
             get: function(petID) {
                 return Restangular.one('pet', petID).get();
             }

         }; //end of return
     }     
     
     

})();