const express = require("express");
const path = require("path");
const { router } = require("./router");
const PORT = 3000;
const dbConfigs = require('./knexfile')
const knex = require('knex')(dbConfigs)

const app = express();

app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'view')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
}); 

