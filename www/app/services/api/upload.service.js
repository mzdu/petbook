(function() {
    'use strict';

    angular.module('petBook.services.api.upload', [])

    .factory('UploadService', UploadService);

    function UploadService($cordovaFileTransfer, apiLocal, Restangular, $q, $http) {

            var AWS_ACCESS_KEY = 'AKIAJQB2DVDLK4DDGSYA';
            var AWS_SECRET_KEY = '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';
            var S3_BUCKET = 'petbookpics';

            AWS.config.update({
                accessKeyId: AWS_ACCESS_KEY,
                secretAccessKey: AWS_SECRET_KEY
            });

            AWS.config.update({
                region: 'us-west-2',
                signatureVersion: 'v4'
            });
            var s3 = new AWS.S3();


            return {
                // GET: /Upload/:userID
                // returns all posts from current user
                upload: function(file) {
                    var serverPath = apiLocal + '/uploadFile'
                    var options = {};
                    return $cordovaFileTransfer.upload(serverPath, file, options)
                },

                getS3: function(file) {
                    // return Restangular.one('pet', userID).get(); 
                    // return Restangular.all('uploadFile').post(form);
                    var defer = $q.defer();
                    var s3_params = {
                        Bucket: S3_BUCKET,
                        Key: file.name,
                        Expires: 60,
                        ContentType: file.type,
                        ACL: 'public-read'
                    };
                    s3.getSignedUrl('putObject', s3_params, function(err, data) {
                        if (err) {
                            console.log(err);
                            defer.reject(err);
                        } else {
                            console.log('data is: ', data);
                            var return_data = {
                                signed_request: data,
                                url: 'https://' + S3_BUCKET + '.s3.amazonaws.com/' + file.name
                            };
                            // res.write(JSON.stringify(return_data));
                            defer.resolve(return_data);
                        } //end else
                    }); //end getSigned
                    return defer.promise;
                }, // end getS3

                uploadS3: function(file) {

                        var defer = $q.defer();
                        var s3_params = {
                            Bucket: S3_BUCKET,
                            Key: file.name,
                            Body: file,
                            ContentType: file.type
                        };

                        s3.upload(s3_params, function(err, data) {
                            if (err) {
                                console.log(err);
                                defer.reject(err);
                            } else {
                                console.log('data is: ', data);
                                defer.resolve(data);
                            } //end else
                        }); //end of s3.upload

                        return defer.promise;
                    } // end uploadS3

                }

        } //end uploadService

})();
