const dbConfigs = require('./knexfile');
const knex = require('knex')(dbConfigs);

module.exports = knex;