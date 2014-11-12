// Load modules
var bnet = require('./provider/bnet');

// Declare internals

var internals = {};

exports.register = function(plugin, options, next) {
    plugin.dependency('bell', function(plugin, next) {
        var bell = require('bell');
        console.log('bell providers: ', bell.providers);
        bell.providers.bnet = bnet;
        // Register the bnet provider with the built-ins
        next();
    });
    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};