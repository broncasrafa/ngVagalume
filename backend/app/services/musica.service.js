var request = require('request');
var Promise = require('bluebird');
var settings = require('../../config/appsettings.json')
var cheerio = require('cheerio')

exports.buscarTop100Musicas = function(url) {
    return new Promise((resolve, reject) => {

        var options = {
            url: url,
            headers: settings.request_headers
        }

        request.get(options, (error, response, body) => {
            try {
                var objData = scrapeTop100MusicasData(error, body)
                return resolve(objData)
            } catch(e) {
                return reject(new Error(e.message))
            }
        })
    })
}


function scrapeTop100MusicasData(error, body) {
    if(error) {
        throw new Error(error.message);
    }
    if(body == null) {
        throw new Error('Body is empty');
    }

    try {
        var $ = cheerio.load(body);

        if($('div.errorContentBg').find('div.errorContent').length > 0) {
            throw new Error('No data provided');
        }

        var musicas = []
        $('div.topContentContainer').children('ol.topCard').find('li').each(function(i, item) {
            var li_elem = $(this)
            var topPosition = li_elem.children('div.topPosition')
            var cardCenter = li_elem.children('div.cardCenterCol').find('div.topInfo')
                        
            var musica = {
                position: topPosition.find('p.w1').text(),
                title: cardCenter.find('a.w1.h22').text(),
                artist: cardCenter.find('p.styleBlack').text(),
                link: `https://www.vagalume.com.br${cardCenter.find('a.w1.h22').attr('href')}`
            } 
            musicas.push(musica)
        })

        var objRetorno = {
            musicas: musicas
        }
        return objRetorno
    } catch(err) {
        throw new Error(err.message);
    }
}

