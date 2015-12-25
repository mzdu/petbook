(function() {
    'use strict';

    angular
        .module('petBook.auth.register.directive', [])
        .directive('usernameAvailable', usernameAvailable);

    usernameAvailable.$inject = ['$timeout', '$q'];

    /* @ngInject */
    function usernameAvailable($timeout, $q) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'AE',
		    require: 'ngModel',
           
        };
        return directive;

        function link(scope, elm, attr, model) { 
	      model.$asyncValidators.usernameExists = function() {

	        //here you should access the backend, to check if username exists
	        //and return a promise
	        //here we're using $q and $timeout to mimic a backend call 
	        //that will resolve after 1 sec

	        var defer = $q.defer();
	        $timeout(function(){
	          model.$setValidity('usernameExists', false); 
	          defer.resolve;
	        }, 1000);
	        return defer.promise;
	      };
	    }
    }


})();

