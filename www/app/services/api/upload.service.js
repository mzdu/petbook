(function() {
    'use strict';

    angular.module('petBook.services.api.upload', [])

    .factory('UploadService', UploadService)

    function UploadService($cordovaFileTransfer, apiLocal) {

        return {
            // GET: /Upload/:userID
            // returns all posts from current user
            upload: function(file) {
                var serverPath = apiLocal + '/uploadFile'
                var options = {};
                return $cordovaFileTransfer.upload(serverPath, file, options)
                   
            }


        }; //end of return
    };

})();
