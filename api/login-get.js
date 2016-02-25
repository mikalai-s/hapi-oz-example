'use strict';


module.exports = function (server) {
    return {
        method: 'GET',
        path: '/login',
        config: {
            auth: false,
            handler: function (request, reply) {
                reply.view('login', { appId: request.query.appId });
            }
        }
    };
};