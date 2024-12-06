const path = require("path");
const knex = require("knex");
const configOptions = require("../knexfile");
const db = knex(configOptions);

const indexController = (req, res) => {
  // res.sendFile(path.join(__dirname, '../view', 'index.html'));
    res.render('index')
  };


module.exports = {
    indexController
  };
  