'use strict';

const oz = require('oz');
const data = require('../data-server');


module.exports = function (server) {
    return {
        method: 'POST',
        path: '/auth',
        config: {
            auth: false,
            handler: function (request, reply) {
                // The user is redirected to the server, logs in, and grant app access, resulting in an rsvp
                const app = data.apps[request.payload.appId];
                oz.ticket.rsvp(app, data.grant, data.encryptionPassword, {}, (err, rsvp) => {
                    // After granting app access, the user returns to the app with the rsvp
                    reply.redirect(app.callbackUrl + '?appId=' + request.payload.appId + '&rsvp=' + rsvp)
                });
            }
        }
    };
};