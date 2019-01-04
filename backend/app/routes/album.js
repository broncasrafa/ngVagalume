var router = require('express').Router()
var _service = require('../services/album.service')

router.get('/top100', (req, res) => {
    var tipo = req.query.tipo
    var ano = req.query.ano
    var mes = req.query.mes
    var url = ''

    if(!tipo) {
        url = 'https://www.vagalume.com.br/top100/albuns/geral'
    } else {
        url = `https://www.vagalume.com.br/top100/albuns/${tipo}`
    }

    if(!ano) {
        url = url + '/' + new Date().getFullYear
    } else {
        url = url + '/' + ano
    }

    if(!mes) {
        var mesT = (new Date().getMonth() + 1).length > 1 ? (new Date().getMonth() + 1) : `0${(new Date().getMonth() + 1)}`
        url = url + '/' + mesT
    } else {
        url = url + '/' + mes
    }

    _service.buscarTop100Albums(url)
        .then(function(result) {
            res.status(200).json({ status: 'OK', errors: {}, data: result });
        })
        .catch(err => {
            res.status(400).json({ status: 'ERROR', errors: err.message, data: {}});
        })
})

router.get('/', (req, res) => {
    var artId = req.query.artId
    var albId = req.query.albId

    _service.buscarAlbum(artId, albId)
        .then(function(result) {
            res.status(200).json({ status: 'OK', errors: {}, data: result });
        })
        .catch(err => {
            res.status(400).json({ status: 'ERROR', errors: err.message, data: {}});
        })
})

module.exports = router


