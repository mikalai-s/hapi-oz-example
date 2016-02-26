'use strict';

const oz = require('oz');

const encryptionPassword = 'a_password_that_is_not_too_short_and_also_not_very_random_but_is_good_enough';

const apps = {
    myleapp: {
        id: 'myleapp',
        scope: ['r', 'w'],
        key: 'werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn',
        algorithm: 'sha256',
        callbackUrl: '/client'
    }
};

const users = {
    mikalai: '2'
}

const grant = {
    id: 'a1b2c3d4e5f6g7h8i9j0',
    app: 'myleapp',
    user: 'mikalai'
};

const ozOptions = {
    oz: {
        encryptionPassword: encryptionPassword,
        loadAppFunc: function (id, callback) {
            callback(null, apps[id]);
        },
        loadGrantFunc: function (id, callback) {
            const ext = {
                public: 'everybody knows',
                private: 'the the dice are loaded'
            };
            grant.exp = oz.hawk.utils.now() + 60000;
            callback(null, grant, ext);
        }
    }
};

var data = module.exports = {
    encryptionPassword: encryptionPassword,
    apps: apps,
    users: users,
    grant: grant,
    ozOptions: ozOptions
};