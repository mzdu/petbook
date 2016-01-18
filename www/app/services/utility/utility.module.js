(function() {
    'use strict';

    angular
        .module('petBook.services.utility', [
            'petBook.services.utility.location',
            'petBook.services.utility.storage',
            'petBook.services.utility.toast'
        ]);
})();