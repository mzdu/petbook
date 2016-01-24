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
                upload: upload,
                getS3: upload,
                uploadS3: uploadS3,
                uploadS3Data: uploadS3Data
            };
            // GET: /Upload/:userID
            // returns all posts from current user
            function upload(file) {
                var serverPath = apiLocal + '/uploadFile'
                var options = {};
                return $cordovaFileTransfer.upload(serverPath, file, options)
            }

            function getS3(file) {
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
                    s3.getSignedUrl('putObject', function s3_params(err, data) {
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
                } // end getS3

            function uploadS3(file) {

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

            function uploadS3Data(imageData) {
                var imgData = getImgData(imageData); // or just hardcode {extension: "jpg", type: "image/jpeg"} if you only want jpg
                var key = getRandomUserKey() + '.' + imgData.extension; // bucket path after BUCKET_NAME

                // notificationService.showDialog('imgData', angular.toJson(imgData))
                //     .then(function(res) {
                //         console.log('dialoag completed');
                //         notificationService.showDialog('key', key)
                //             .then(function(res) {
                //                 console.log('dialoag completed');
                //             });
                //     });

                var defer = $q.defer();
                var s3_params = {
                    Bucket: S3_BUCKET,
                    ContentEncoding: 'base64',
                    Key: key,
                    Body: imgData.file,
                    ContentType: imgData.type
                };


                s3.putObject(s3_params, function(err, data) {
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
                        file: new Buffer(img.replace(/^data:image\/\w+;base64,/, ""),'base64')
                    };
                } //end getImgData

            function getRandomUserKey() {
                var username = StorageService.getCurrentUser().user.username;
                return username + stringService.makeID(5); //combines username with random string to prevent duplicates
            }




        } //end uploadService

})();
