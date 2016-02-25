'use strict';


module.exports = function (server) {
    return {
        method: 'GET',
        path: '/auth',
        config: {
            auth: false,
            handler: function (request, reply) {
                reply.view('auth', { appId: request.query.appId });
            }
        }
    };
};