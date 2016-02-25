'use strict';

const data = require('../data-client');


module.exports = function (server) {
    return {
        method: 'GET',
        path: '/client',
        config: {
            auth: false,
            handler: function (request, reply) {
                reply.view('client', { appId: data.app.id });
            }
        }
    };
};