(function() {
    'use strict';

    angular
        .module('petBook.auth', [
            'petBook.auth.login.controller',
            'petBook.auth.register.controller'
        ]);
})();