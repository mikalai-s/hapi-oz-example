'use strict';

const data = require('../data-client');
const oz = require('oz');
const post = require('request').post;
const get = require('request').get;

module.exports = function (server) {
    return {
        method: 'GET',
        path: '/client',
        config: {
            auth: false,
            handler: function (request, reply) {
                if (request.query.rsvp) {
                    // if it's rsvp callback, then we just need to get user ticket to access a protected resource
                    // Get app ticket
                    post({
                        url: 'http://localhost:3000/oz/app',
                        headers: {
                            authorization: oz.client.header('http://localhost:3000/oz/app', 'POST', data.app).field,
                            'content-type': 'application/json'
                        },
                        json: true
                    }, function (err, response, appTicket) {
                        console.log(70, appTicket, typeof appTicket);
                        if (err) { return reply(err); }
                        if (response.statusCode !== 200) { return reply(appTicket); }

                        // The app exchanges the rsvp for a user ticket
                        post({
                            url: 'http://localhost:3000/oz/rsvp',
                            headers: {
                                authorization: oz.client.header('http://localhost:3000/oz/rsvp', 'POST', appTicket).field
                            },
                            json: {
                                rsvp: request.query.rsvp
                            }
                        }, function (err, response, userTicket) {
                            if (err) { return reply(err); }
                            if (response.statusCode !== 200) { return reply(userTicket); }

                            // We've got user ticket now and are able to do a request to a protected resources
                            get({
                                url: 'http://localhost:3000/protected',
                                headers: {
                                    authorization: oz.client.header('http://localhost:3000/protected', 'GET', userTicket).field
                                }
                            }, function (err, response, body) {
                                reply.view('client', { data: body });
                            });
                        });
                    });
                } else {
                    // otherwise just show login to server button
                    reply.view('client', { appId: data.app.id });
                }
            }
        }
    };
};