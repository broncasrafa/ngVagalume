import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Helpers } from '../app.helpers';
import { AppSettings } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class ArtistaService {

  private galeriaUrl = `${AppSettings.server_base_url}/fotos`
  private biografiaUrl = `${AppSettings.server_base_url}/biografia`
  private discografiaUrl = `${AppSettings.server_base_url}/discografia`

  constructor(private _http: Http) { }

  getArtista(urlId: string) {
    const url = 'https://www.vagalume.com.br' + urlId + 'index.js'
    return this._http.get(url)
      .toPromise()
      .then(response => response.json().artist)
      .catch(Helpers.handleError);
  }

  getArtistaBiografia(art: string) {
    const url = `${this.biografiaUrl}?art=${art}`
    return this._http.get(url)
      .toPromise()
      .then(response => response.json().data.biografia)
      .catch(Helpers.handleError);
  }

  getArtistaFotos(art: string) {
    const url = `${this.galeriaUrl}?art=${art}`
    return this._http.get(url)
      .toPromise()
      .then(response => response.json().data)
      .catch(Helpers.handleError);
  }

  getArtistaDiscografia(art: string) {
    const url = `${this.discografiaUrl}?art=${art}`
    return this._http.get(url)
      .toPromise()
      .then(response => response.json().data.albums)
      .catch(Helpers.handleError);
  }
}
