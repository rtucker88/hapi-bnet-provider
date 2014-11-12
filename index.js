// Load modules
var bnet = require('./provider/bnet');

// Declare internals

var internals = {};

exports.register = function(plugin, options, next) {
    var bell = require('bell');
    bell.providers.bnet = bnet;
    plugin.dependency('bell');
    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};