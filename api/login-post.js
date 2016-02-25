'use strict';


var users = {
    mikalai: '2'
};


module.exports = function (server) {
    return {
        method: 'POST',
        path: '/login',
        config: {
            auth: false,
            handler: function (request, reply) {
                if (users[request.payload.username] === request.payload.password) {
                    reply.redirect('/auth?appId=' + request.payload.appId);
                } else {

                }
            }
        }
    };
};