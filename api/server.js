'use strict';

const oz = require('oz');
const data = require('../data-server');


module.exports = function (server) {
    return [
        {
            method: 'GET',
            path: '/login',
            config: {
                auth: false,
                handler: function (request, reply) {
                    reply.view('login', { appId: request.query.appId });
                }
            }
        },
        {
            method: 'POST',
            path: '/login',
            config: {
                auth: false,
                handler: function (request, reply) {
                    if (data.users[request.payload.username] === request.payload.password) {
                        reply.redirect('/auth?appId=' + request.payload.appId);
                    } else {
                        reply.view('login', { error: 'Username or password doesn\'t match' });
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/auth',
            config: {
                auth: false,
                handler: function (request, reply) {
                    reply.view('auth', { appId: request.query.appId });
                }
            }
        },
        {
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
        },
        {
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
        }
    ];
};