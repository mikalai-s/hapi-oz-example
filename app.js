'use strict';

const Server = require('hapi').Server;
const scarecrow = require('scarecrow');

const path = require('path');
const fs = require('fs');
const endpoints = fs.readdirSync('./api').map(f => './api/' + f);

const server = new Server();
server.connection({ port: 3000 });

// register endpoints


// oz registration

const encryptionPassword = 'a_password_that_is_not_too_short_and_also_not_very_random_but_is_good_enough';
const apps = {
    myleapp: {
        id: 'myleapp',
        scope: ['r', 'w'],
        key: 'werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn',
        algorithm: 'sha256',
        user: 'Mik'
    }
};

const grant = {
    id: 'a1b2c3d4e5f6g7h8i9j0',
    app: 'social',
    user: 'john',
    exp: 60000
};

const options = {
    oz: {
        encryptionPassword: encryptionPassword,
        loadAppFunc: function (id, callback) {
            console.log(2);
            callback(null, apps[id]);
        },
        loadGrantFunc: function (id, callback) {
            console.log(3);
            const ext = {
                public: 'everybody knows',
                private: 'the the dice are loaded'
            };
            callback(null, grant, ext);
        }
    }
};

server.register(scarecrow)
    .then(() => server.auth.strategy('oz', 'oz', true, options))
    .then(() => server.register(require('vision'), err => {
        server.views({
            engines: {
                html: require('handlebars')
            },
            relativeTo: path.join(__dirname, 'views'),
            isCached: false
         //   path: 'templates'
        });
    }))
    .then(() => endpoints.forEach(p => server.route(require(p)(server))))
    .then(() => server.start())
    .then(() => console.log('Server running at:', server.info.uri))
    .then(() => console.log(server.table()[0].table.map(t => t.method + ' ' + t.path)))
    .catch(console.error);

