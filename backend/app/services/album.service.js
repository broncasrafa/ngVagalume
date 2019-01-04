var request = require('request');
var Promise = require('bluebird');
var settings = require('../../config/appsettings.json')
var cheerio = require('cheerio')

exports.buscarTop100Albums = function(url) {
    return new Promise((resolve, reject) => {

        var options = {
            url: url,
            headers: settings.request_headers
        }

        request.get(options, (error, response, body) => {
            try {
                var objData = scrapeTop100AlbumsData(error, body)
                return resolve(objData)
            } catch(e) {
                return reject(new Error(e.message))
            }
        })
    })
}

exports.buscarAlbum = function(artId, albId) {
    return new Promise((resolve, reject) => {
        if(!artId) {
            return reject(new Error('Argument "artId" must be specified'));
        }
        if(!albId) {
            return reject(new Error('Argument "albId" must be specified'));
        }

        var options = {
            url: `https://www.vagalume.com.br/${artId}/discografia/${albId}.html`,
            headers: settings.request_headers
        }

        request.get(options, (error, response, body) => {
            try {
                var objData = scrapeAlbumData(error, body)
                return resolve(objData)
            } catch(e) {
                return reject(new Error(e.message))
            }
        })
    })
}


function scrapeTop100AlbumsData(error, body) {
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

        var albums = []
        $('div.topContentContainer').children('ol.topCard').find('li').each(function(i, item) {
            var li_elem = $(this)
            var topPosition = li_elem.children('div.topPosition')
            var cardCenter = li_elem.children('div.cardCenterCol').find('div.topInfo')
            var img = cardCenter.find('a').find('picture').find('img').attr('src')
            if(img == undefined) {
                img = cardCenter.find('a').find('picture').find('img').attr('data-src')
            }
            
            var album = {
                position: topPosition.find('p.w1').text(),
                img: `https://www.vagalume.com.br${img}`,
                title: cardCenter.find('a.w1.h22').text(),
                artist: cardCenter.find('p.styleBlack').text(),
                link: `https://www.vagalume.com.br${cardCenter.find('a.w1.h22').attr('href')}`
            } 
            albums.push(album)
        })

        var objRetorno = {
            albums: albums
        }
        return objRetorno
    } catch(err) {
        throw new Error(err.message);
    }
}

function scrapeAlbumData(error, body) {
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

        var albums = []
        var discos = $('div.artistWrapper').children('div.letrasWrapper').find('div.topLetrasWrapper')
        discos.each(function(i, item) {
            var div_elem = $(this)
            var album = {}            
            var tracks = []

            var img_url = div_elem.children('div.cardAlbumHeader').find('div.albumCoverWrapper').find('picture.square').find('img').attr('src')
            if(img_url == undefined) {
                img_url = div_elem.children('div.cardAlbumHeader').find('div.albumCoverWrapper').find('picture.square').find('img').attr('data-src')
            }

            div_elem.find('ol#topMusicList').find('li').each(function(i, item) {
                var li_elem = $(this)
                var nro = li_elem.children('div.flexSpcBet').find('div.lineColLeft').find('span.numMusic').text().replace('.', '').trim()
                var name = li_elem.children('div.flexSpcBet').find('div.lineColLeft').find('a.nameMusic').text()
                var link = li_elem.children('div.flexSpcBet').find('div.lineColLeft').find('a.nameMusic').attr('href')
                var track = {
                    nro: nro, 
                    name: name, 
                    link: `https://www.vagalume.com.br${link}`
                }
                tracks.push(track)
            })
                                    
            album.img = `https://www.vagalume.com.br${img_url}`
            album.title = div_elem.find('div.cardAlbumInfos').find('h3.albumTitle').text()
            album.year = div_elem.find('div.cardAlbumInfos').find('p.albumYear').text()
            album.record = div_elem.find('div.cardAlbumInfos').find('p.albumRecord').text()
            album.track_count = div_elem.find('div.trackWrapper').find('p.track').text().replace('# ', '').replace('faixas', '').trim()
            album.tracks = tracks
            albums.push(album)            
        })
        
        var objRetorno = {}
        objRetorno.albums = albums

        return objRetorno
    } catch(err) {
        throw new Error(err.message);
    }
}

