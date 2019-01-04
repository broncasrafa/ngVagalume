var request = require('request');
var Promise = require('bluebird');
var settings = require('../../config/appsettings.json')
var cheerio = require('cheerio')

exports.buscarFotosArtista = function(art) {
    return new Promise((resolve, reject) => {
        if (!art) {
            return reject(new Error('Argument "art" must be specified'));
        }

        var options = {
            url: `https://www.vagalume.com.br/${art}/fotos/`,
            headers: settings.request_headers
        }

        request.get(options, (error, response, body) => {
            try {
                var objData = scrapeFotosArtistaData(error, body, art)
                return resolve(objData)
            } catch(e) {
                return reject(new Error(e.message))
            }
        })
    })
}

exports.buscarBiografiaArtista = function(art) {
    return new Promise((resolve, reject) => {
        if (!art) {
            return reject(new Error('Argument "art" must be specified'));
        }

        var options = {
            url: `https://www.vagalume.com.br/${art}/biografia/`,
            headers: settings.request_headers
        }

        request.get(options, (error, response, body) => {
            try {
                var objData = scrapeBiografiaArtistaData(error, body);
                return resolve(objData);
            } catch(e) {
                return reject(new Error(e.message));
            }
        })
    })
}

exports.buscarDiscografiaArtista = function(art) {
    return new Promise((resolve, reject) => {
        if (!art) {
            return reject(new Error('Argument "art" must be specified'));
        }

        var options = {
            url: `https://www.vagalume.com.br/${art}/discografia/`,
            headers: settings.request_headers
        }

        request.get(options, (error, response, body) => {
            try {
                var objData = scrapeDiscografiaArtistaData(error, body, art);
                return resolve(objData);
            } catch(e) {
                return reject(new Error(e.message));
            }
        })
    })
}

exports.buscarTop100Artistas = function(url) {
    return new Promise((resolve, reject) => {

        var options = {
            url: url,
            headers: settings.request_headers
        }

        request.get(options, (error, response, body) => {
            try {
                var objData = scrapeTop100ArtistasData(error, body)
                return resolve(objData)
            } catch(e) {
                return reject(new Error(e.message))
            }
        })
    })
}


function scrapeFotosArtistaData(error, body, art) {
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

        var objRetorno = []

        //console.log($('div.gridContent').children('div.headLine').find('div.sideWrapper').find('h2.title').text().includes('Enviadas por usuários'))
        
        var listaFotos = $('div.gridContent').children('ul.galleryList').find('li')
        listaFotos.each(function(i, item) {
            var li_elem = $(this)
            var foto_data = li_elem.children('picture').find('img').attr('src')
            var foto_id = foto_data.split('.jpg')[0].split('/').pop().replace('gt', 'g')
            var foto_url = `https://www.vagalume.com.br/${art}/images/${foto_id}.jpg`
            
            objRetorno.push(foto_url)
        })

        return objRetorno
    } catch(err) {
        throw new Error(err.message);
    }
}

function scrapeBiografiaArtistaData(error, body) {
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

        var objRetorno = {}        
        var biografia = {}
        biografia.title = $('div.bioTitleBox').find('h4').text()
        biografia.born = $('div.bioTitleBox').find('p.bioSubtitle').text()
        biografia.place = $('div.bioTitleBox').find('p.bioPlace').text()
        biografia.bio = $('div.bioTextBox').find('p.bioText').text().replace(/<br\s*[\/]?>/gi, "\n")
        biografia.site_oficial = $('div.infoBlock').find('a.external-after').attr('href')
        biografia.redes_sociais = []
        biografia.site_fas = []

        var redes_sociais = $('div.infoBlock').children('div.socialWrapper').find('ul.social-list').find('li')
        redes_sociais.each(function(i, item) {
            var li_elem = $(this)
            var link = li_elem.find('a.socialLink').attr('href')
            biografia.redes_sociais.push(link)
        })

        var site_fas = $('div.infoBlock').children('div.two-grid').find('a')
        site_fas.each(function(i, item) {
            var a_elem = $(this)

            var obj = { 
                link: a_elem.attr('href'),
                name: a_elem.text()
            }

            biografia.site_fas.push(obj)
        })
        objRetorno.biografia = biografia
        return objRetorno
    } catch(err) {
        throw new Error(err.message);
    }
}

function scrapeDiscografiaArtistaData(error, body, art) {
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

function scrapeTop100ArtistasData(error, body) {
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

        var artists = []
        $('div.topContentContainer').children('ol.topCard').find('li').each(function(i, item) {
            var li_elem = $(this)
            var topPosition = li_elem.children('div.topPosition')
            var cardCenter = li_elem.children('div.cardCenterCol').find('div.topInfo')
            var img = cardCenter.find('a').find('picture').find('img').attr('src')
            if(img == undefined) {
                img = cardCenter.find('a').find('picture').find('img').attr('data-src')
            }
            
            var artist = {
                position: topPosition.find('p.w1').text(),
                img: `https://www.vagalume.com.br${img}`,
                title: cardCenter.find('a.w1.h22').text(),
                artId: cardCenter.find('a.w1.h22').attr('href').replace('/', '').replace('/', '')
            } 
            artists.push(artist)
        })

        var objRetorno = {
            artists: artists
        }
        return objRetorno
    } catch(err) {
        throw new Error(err.message);
    }
}