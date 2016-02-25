'use strict';

const Server = require('hapi').Server;
const scarecrow = require('scarecrow');

const path = require('path');
const fs = require('fs');
const endpoints = fs.readdirSync('./api').map(f => './api/' + f);

const data = require('./data-server');

const server = new Server();
server.connection({ port: 3000 });

server.register(scarecrow)
    .then(() => server.auth.strategy('oz', 'oz', true, data.ozOptions))
    .then(() => server.register(require('vision'), err => {
        server.views({
            engines: {
                html: require('handlebars')
            },
            relativeTo: path.join(__dirname, 'views'),
            isCached: false
        });
    }))
    .then(() => endpoints.forEach(p => server.route(require(p)(server))))
    .then(() => server.start())
    .then(() => console.log('Server running at:', server.info.uri))
    .then(() => console.log(server.table()[0].table.map(t => t.method + ' ' + t.path)))
    .catch(console.error);

