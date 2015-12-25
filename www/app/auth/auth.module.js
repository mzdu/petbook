(function() {
    'use strict';

    angular
        .module('petBook.auth', [
            'petBook.auth.login.controller',
            'petBook.auth.register',
            'petBook.auth.forgotPassword.controller',
            'petBook.auth.changePassword.controller'
        ]);
})();