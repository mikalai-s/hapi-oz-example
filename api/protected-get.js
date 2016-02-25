'use strict';

module.exports = function (server) {
    return {
        method: 'GET',
        path: '/protected',
        config: {
            auth: {
                entity: 'user'
            },
            // NOTE: setting auth to 'oz' or '{ entity: 'app' }' will allow app token be used to get the resource, but we only need users to access it
            handler: function (request, reply) {
                reply(request.auth.credentials.user + ' you got protected resource!');
            }
        }
    };
};