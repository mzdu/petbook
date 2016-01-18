(function() {
    'use strict';

    angular.module('petBook.services.utility.notification', [])

    .factory('notificationService', notificationService)


    function notificationService($cordovaToast, $ionicPopup) {
        // console.log('in toast service');
        return {
            showToast: function(msg) {
                return $cordovaToast.showLongBottom(msg);
            },
            showDialog: function(title, msg){
                 return $ionicPopup.alert({
                    title: title,
                    template: msg
                });
                // alertPopup.then(function(res) {
                //     console.log('dialoag completed');
                // });
            }
        }; //end of return
    };

})();
