'use strict';

const oz = require('oz');

module.exports = {
    encryptionPassword: 'a_password_that_is_not_too_short_and_also_not_very_random_but_is_good_enough',
    apps: {
        myleapp: {
            id: 'myleapp',
            scope: ['r', 'w'],
            key: 'werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn',
            algorithm: 'sha256',
            callbackUrl: '/client-callback'
        }
    },
    grant: {
        id: 'a1b2c3d4e5f6g7h8i9j0',
        app: 'myleapp',
        user: 'mik',
        exp: oz.hawk.utils.now() + 60000
    }
};