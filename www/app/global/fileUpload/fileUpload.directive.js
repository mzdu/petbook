(function() {
    'use strict';

    angular
        .module('petBook.global.fileUpload.directive', [])
        .directive('fileUpload', fileUpload);

    fileUpload.$inject = [];

    /* @ngInject */
    function fileUpload() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            // bindToController: true,
            // controller: FileUploadController,
            // controllerAs: 'vm',
            link: link,
            restrict: 'A',
            scope: {
            },
            require:"ngModel"
        };
        return directive;

        function link($scope, el, attrs, ngModel){
            el.bind('change', function(event){
                var files = event.target.files;
                var file = files[0];

                ngModel.$setViewValue(file);
                console.log('file is: ', file);
                $scope.$apply();
            });
        }


    }

    /* @ngInject */
    function FileUploadController() {

    }
})();