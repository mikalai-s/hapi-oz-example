'use strict';

const Promise = require('bluebird');

module.exports = function (server) {
    return {
        method: 'GET',
        path: '/hello',
        config: {
            auth: {
                entity: 'user'
            },
            handler: function (request, reply) {
                console.log(1);
                reply(JSON.stringify(request.auth.credentials) + ' your in!');
            }
        }
    };
};