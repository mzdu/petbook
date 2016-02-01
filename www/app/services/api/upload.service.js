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
                uploadS3Uri: uploadS3Uri,
            };
            // GET: /Upload/:userID
            // returns all posts from current user
           

            function getS3(file) {

                    var key = file.split('/').pop();
                    console.log('key is: ', key);
                    // getRandomUserKey() + '.jpg';
                    console.log('file is: ', file);
                    var defer = $q.defer();
                    var s3_params = {
                        Bucket: S3_BUCKET,
                        Key: key,
                        Expires: 60
                        // ContentType: 'image/jpeg',
                        // ACL: 'public-read'
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


            function uploadS3Uri(uri) { //for uploading image data

                var defer = $q.defer();
                console.log('before encode');
                window.plugins.Base64.encodeFile(uri, function(base64) {
                    console.log('encoded file');
                    var key = getRandomUserKey() + '.jpg'; // bucket path after BUCKET_NAME

                    var s3_params = {
                        Bucket: S3_BUCKET,
                        Key: key,
                        Body: base64,
                        ContentType: 'image/jpeg'
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
                });

            }

        
            function uploadS3Data(imageData) {
                // var imgData = getImgData(imageData); // or just hardcode {extension: "jpg", type: "image/jpeg"} if you only want jpg
                // var key = getRandomUserKey() + '.' + imgData.extension; // bucket path after BUCKET_NAME
                // imageData = imageData.replace(", ", "");
                var key = getRandomUserKey() + '.jpg'

                var defer = $q.defer();
                var s3_params = {
                    ACL: 'public-read',
                    Bucket: S3_BUCKET,
                    // ContentEncoding: 'base64',
                    Key: key,
                    // Body: imgData.file,
                    Body: imageData,
                    // ContentType: imgData.type
                    ContentType: 'image/jpeg'
                };


                s3.upload(s3_params, function(err, data) {
                    // s3.putObject(s3_params, function(err, data) {
                    if (err) {
                        defer.reject(err);
                    } else {
                        defer.resolve(data);
                    } //end else
                }); //end of s3.upload
                return defer.promise;
            }

            //helpers
            function getImgData(img) {
                    var extension = 'jpg';
                    var type = 'image/jpeg';
                    var base64result = img.split(',')[0];
                    if (base64result.indexOf("png") > -1) {
                        extension = 'png';
                        type = 'image/png';
                    }

                    return {
                        extension: extension,
                        type: type,
                        file: new Buffer(img.replace(/^data:image\/\w+;base64,/, ""), 'base64')
                    };
                } //end getImgData

            function getRandomUserKey() {
                var username = StorageService.getCurrentUser().user.username;
                return username + stringService.makeID(5); //combines username with random string to prevent duplicates
            }




        } //end uploadService

})();
