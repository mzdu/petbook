(function() {
    'use strict';

    angular
        .module('petBook.auth.directives', [])
        .directive('validateEquals', validateEquals);

    validateEquals.$inject = [];

    /* @ngInject */
    function validateEquals() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            require: '?ngModel',
            controller: Controller,
            controllerAs: 'vm',
            link: link,
            restrict: 'A'
        };
        return directive;

	function link(scope, elem, attrs, ngModel) {
      if(!ngModel) return; // do nothing if no ng-model

      // watch own value and re-validate on change
      scope.$watch(attrs.ngModel, function() {
        validate();
      });

      // observe the other value and re-validate on change
      attrs.$observe('equals', function (val) {
        validate();
      });

      var validate = function() {
        // values
        var val1 = ngModel.$viewValue;
        var val2 = attrs.equals;

        // set validity
        ngModel.$setValidity('equals', ! val1 || ! val2 || val1 === val2);
      };
    }
  }
    
    /* @ngInject */
    function Controller() {

    }
})();