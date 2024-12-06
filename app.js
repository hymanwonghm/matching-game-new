// Importing modules
const express = require('express')
const path = require('path')
const { router } = require('./routers')
const dbConfigs = require('./knexfile')
const knex = require('knex')(dbConfigs)

// Define Express App
const app = express()
const port = 3000

// Setting views and static
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'static')))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', router)

// Starting Express App server
app.listen(port, () => {
    console.log(`App running on port ${port}`)
})