(function() {
    'use strict';

    angular.module('petBook.services.utility.storage', [])

    .factory('StorageService', StorageService)


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

})();