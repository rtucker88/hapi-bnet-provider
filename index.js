// Load modules
var bnet = require('./provider/bnet');

// Declare internals

var internals = {};

exports.register = function(plugin, options, next) {
    console.log('bell outside: ', plugin.plugins['bell']);
    plugin.dependency('bell', function(plugin, next) {
        // Register the bnet provider with the built-ins
        console.log('bell inside: ', plugin.plugins['bell']);
        next();
    });
    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};