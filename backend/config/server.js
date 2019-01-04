var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(express.static('./app/public'))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({ limit: '50mb', extended: true }))


//#region [ Rotas ]
var artistaRoute = require('../app/routes/artista')
var albumRoute = require('../app/routes/album')
var musicaRoute = require('../app/routes/musica')

app.use('/api/v1/vagalume/artista', artistaRoute)
app.use('/api/v1/vagalume/album', albumRoute)
app.use('/api/v1/vagalume/musica', musicaRoute)
//#endregion

module.exports = app