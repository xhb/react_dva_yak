'use strict';

const server = {};

require('fs').readdirSync(require('path').join(__dirname + '/server'))
  .forEach(function (file) {
    Object.assign(server, require('./server/' + file));
  });

module.exports = server;
