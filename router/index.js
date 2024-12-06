const express = require("express");
const path = require("path")
const { Router } = require("express");

const {
    indexController
  } = require("../controller");

  const router = Router();

  router.route("/").get(indexController);


  module.exports = { router };