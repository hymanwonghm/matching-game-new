const { Router } = require('express')
const { indexController } = require('../controllers')
const router = Router()

router.route('/').get(indexController)

module.exports = { router }