'use strict';

var Hapi = require('hapi');
var server = new Hapi.Server(5000);

server.pack.register([require('bell'), require('../')], function(err) {
    if(err) {
        throw err;
    }

    server.auth.strategy('bnet', 'bell', {
        provider: 'bnet',
        password: 'password',
        clientId: '<YOUR_BNET_ID>',
        clientSecret: '<YOUR_BNET_SECRET>'
    });

    // Your login route and callback route
    server.route({
        method: 'GET',
        path: '/auth/bnet',
        config: {
            auth: 'bnet',
            handler: function(request, reply) {
                reply(request.auth.credentials.profile);
            }
        }
    });

    server.start();
});