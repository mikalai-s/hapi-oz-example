'use strict';


const appHawkCredentials = {
    id: 'myleapp',
    key: 'werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn',
    algorithm: 'sha256'
};


module.exports = function (server) {
    return {
        method: 'GET',
        path: '/client',
        config: {
            auth: false,
            handler: function (request, reply) {
                reply.view('client', { appId: appHawkCredentials.id });
            }
        }
    };
};