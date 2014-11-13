### **hapi-bnet-provider**

**hapi-bnet-provider** is a third-party oauth provider plugin for [bell](https://github.com/hapijs/bell). **hapi-bnet-provider** is an unofficial
oauth plugin for Blizzard's [Battle.net](https://battle.net). It is based off of Blizzard's [passport-bnet](https://github.com/Blizzard/passport-bnet) plugin.

Lead Maintainer: [Ryan Tucker](https://github.com/rtucker88)

### Usage

**hapi-bnet-provider** works by extending bell's built-in providers with a new 'bnet' scheme.

```javascript
var Hapi = require('hapi');
var server = new Hapi.Server(8000);

// Register bell with the server
server.pack.register(require('bell'), require('hapi-bnet-provider'), function (err) {

    // Declare the bnet authentication strategy
    server.auth.strategy('bnet', 'bell', {
        provider: 'bnet',
        password: 'cookie_encryption_password',
        clientId: 'my_bnet_client_id',
        clientSecret: 'my_bnet_client_secret'
    });

    // Use the 'bnet' authentication scheme and do something with the data
    server.route({
        method: ['GET'],
        path: '/login',          // The callback endpoint registered with the provider
        config: {
            auth: 'bnet',
            handler: function (request, reply) {

                // Perform any account lookup or registration, setup local session,
                // and redirect to the application. The third-party credentials are
                // stored in request.auth.credentials.
                return reply.redirect('/home');
            }
        }
    });

    server.start();
});
```

### Options

The **hapi-bnet-provider** plugin supports the following options:
- `region` - the Battle.net region (defaults to 'us')
- `authorizationURL` - an alternative authorization URL for Battle.net
- `tokenURL` - an alternative token URL for Battle.net
