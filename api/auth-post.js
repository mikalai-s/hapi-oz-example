'use strict';


module.exports = function (server) {
    return {
        method: 'POST',
        path: '/auth',
        config: {
            auth: false,
            handler: function (request, reply) {
                reply('OK!');
                
            }
        }
    };
};