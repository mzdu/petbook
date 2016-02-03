(function() {
    'use strict';

    angular.module('petBook.services.api.upload', [])

    .factory('UploadService', UploadService);

    function UploadService($cordovaFileTransfer, apiLocal, Restangular, $q, $http, stringService, StorageService, notificationService) {

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
                getS3: getS3,
                uploadSignedS3: uploadSignedS3,
            };
            // GET: /Upload/:userID
            // returns all posts from current user


            function getS3(imageUri) {

                    var key = getFileName(imageUri);
                    console.log('key is: ', key);
                    var defer = $q.defer();
                    var s3_params = {
                        Bucket: S3_BUCKET,
                        Key: key,
                        Expires: 60
                    };
                    s3.getSignedUrl('putObject', s3_params, function(err, data) {
                        if (err) {
                            console.log(err);
                            defer.reject(err);
                        } else {
                            console.log('data is: ', data);
                            var return_data = {
                                signed_request: data,
                                url: 'https://' + S3_BUCKET + '.s3.amazonaws.com/' + key
                            };
                            defer.resolve(return_data);
                        } //end else
                    }); //end getSigned
                    return defer.promise;
                } // end getS3


            function uploadSignedS3(imageUri, signed_request) { //for uploading image data
                var options = new FileUploadOptions();
                options.chunkedMode = false;
                options.httpMethod = 'PUT';
                options.headers = {
                    'Content-Type': getImgType(imageUri)
                };

                var defer = $q.defer();

                var ft = new FileTransfer();
                ft.upload(imageUri, signed_request, function(uploadResult) {
                    // $scope.$apply(function() {
                    console.log('success!');
                    defer.resolve(uploadResult);
                    // });
                }, function(error) {
                    // $scope.$apply(function() {
                    defer.reject(error);
                    // console.log('failure!');
                    // });
                }, options, true);

                return defer.promise;
            }


            //helpers

            function getFileName(uri) {
                return uri.split('/').pop();
            }

            function getImgType(uri) {
                var fileName = getFileName(uri);
                if (fileName && fileName.split('.')[1] === 'png') {
                    return 'image/png';
                } else {
                    return 'image/jpeg';
                }
            } //end getImgData

            function getRandomUserKey() {
                var username = StorageService.getCurrentUser().user.username;
                return username + stringService.makeID(5); //combines username with random string to prevent duplicates
            }




        } //end uploadService

})();
