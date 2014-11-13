// Load modules
var async = require('async');
// Declare internals

var internals = {};

exports = module.exports = function (options) {
    var options = options || {};
    options.region = options.region || 'us';

    var authHost = getHost(options.region);
    var masheryHost = getMasheryHost(options.region);
    return {
        protocol: 'oauth2',
        auth: options.authorizationURL || 'https://' + authHost + '/oauth/authorize',
        token: options.tokenURL || 'https://' + authHost + '/oauth/token',
        profile: function(credentials, params, get, callback) {
            async.parallel({
                id: function(done) {
                    get(options.idURL || 'https://' + masheryHost + '/account/user/id', null, function(json) {
                        return done(null, json.id);
                    });
                },
                battletag: function(done) {
                    get(options.battletagURL || 'https://' + masheryHost + '/account/user/battletag', null, function(json) {
                        return done(null, json.battletag);
                    });
                }
            }, function(err, profile) {
                credentials.profile = {
                    id: profile.id,
                    battletag: profile.battletag
                };
                return callback();
            });
        }
    }
};

function getHost(region) {
    if(region === 'cn') {
        return 'www.battlenet.com.cn';
    } else {
        return region + '.battle.net';
    }
}

function getMasheryHost(region) {
    if(region === 'cn') {
        return 'api.battlenet.com.cn';
    } else {
        return region + '.api.battle.net';
    }
}