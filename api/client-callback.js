'use strict';

const oz = require('oz');
const post = require('request').post;
const data = require('../data-client');


module.exports = function (server) {
    return {
        method: 'GET',
        path: '/client-callback',
        config: {
            auth: false,
            handler: function (request, reply) {
                // Get app ticket
                post({
                    url: 'http://localhost:3000/oz/app',
                    headers: {
                        authorization: oz.client.header('http://localhost:3000/oz/app', 'POST', data.app).field
                    }
                }, function (err, response, body) {
                    if (err) { return reply(err); }
                    if (response.statusCode !== 200) { return reply(body); }

                    const appTicket = JSON.parse(body);

                    // The app exchanges the rsvp for a user ticket
                    post({
                        url: 'http://localhost:3000/oz/rsvp',
                        headers: {
                            authorization: oz.client.header('http://localhost:3000/oz/rsvp', 'POST', appTicket).field
                        },
                        json: {
                            rsvp: request.query.rsvp
                        }
                    }, function (err, response, body) {
                        console.log(err, body);
                        reply('ok');
                    });
                });
            }
        }
    };
};