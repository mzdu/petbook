(function() {
    'use strict';

    angular
        .module('petBook.services.api', [
            'petBook.services.api.status',
            'petBook.services.api.auth',
            'petBook.services.api.profile'
        ]);
})();