// Load modules
var bnet = require('./provider/bnet');

// Declare internals

var internals = {};

exports.register = function(plugin, options, next) {
    plugin.dependency('bell', function(plugin, next) {
        // Register the bnet provider with the built-ins
        console.log('plugins: ', plugin.plugins);
        plugin.plugins.bell.providers.bnet = bnet;
        next();
    });
    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};