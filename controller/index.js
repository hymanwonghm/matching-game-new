const path = require("path");
const knex = require("knex");
const configOptions = require("../knexfile");
const db = knex(configOptions);

const indexController = async (req, res) => {

  res.sendFile(path.join(__dirname, '../view', 'index.html'));
    
  };


module.exports = {
    indexController
  };
  