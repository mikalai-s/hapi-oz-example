'use strict';

const oz = require('oz');
const Promise = require('bluebird');
const request = Promise.promisify(require('request'), { context: require('request'), multiArgs: true });

const appHawkCredentials = {
    id: 'myleapp',
    key: 'werxhqb98rpaxn39848xrunpaw3489ruxnpa98w4rxn',
    algorithm: 'sha256'
};


function getRequestOptions(method, url) {
    return {
        url: url,
        method: method,
        headers: {
            authorization: oz.client.header(url, method, appHawkCredentials).field
        }
    };
}


function step1() {
    return request(getRequestOptions('POST', 'http://localhost:3000/oz/app'))
        .spread((response, body) => {
            if (response.statusCode !== 200) {
                throw JSON.parse(body);
            }
            return JSON.parse(body);
        });
}


step1()
    .then(appTicket => console.log('App ticket:', appTicket))
    .catch(console.error);

// const client = new oz.client.Connection({ uri: 'http://localhost:3000', credentials: apps.myleapp });

// client.request('/oz/app', { method: 'POST', payload: }, function (err, result, code, ticket) {
//     console.log(arguments/*, result.toString()*/);
// });