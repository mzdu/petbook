(function() {
    'use strict';

    angular.module('petBook.services.utility.toast', [])

    .factory('toastService', toastService)


    function toastService($cordovaToast) {
        // console.log('in toast service');
        return {
            showToast: function(msg) {
                return $cordovaToast.showLongBottom(msg);
            }
        }; //end of return
    };

})();
