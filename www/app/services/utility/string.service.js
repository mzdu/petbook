(function() {
    'use strict';

    angular.module('petBook.services.utility.string', [])

    .factory('stringService', stringService)


    function stringService($localStorage, $state) {
        // console.log('in storage service');
        return {
            makeID: makeID

        }; //end of return

        function makeID(chars) {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < chars.length; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }
    };

})();
