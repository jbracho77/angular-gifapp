import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGiftsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})

//const MAX_ITEMS = 10;
export class GifsService {

  private apiKey: string = '3jPYe7Bw2V41ObEjIYSaNqgkw6YYlo5P';
  private servicioURL: string ='https://api.giphy.com/v1/gifs';
  private busquedaEndpoint: string = '/search';
  private _historial: string[] = [];

  //TODO Cambiar any por su tipo correspondiente
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {
      
    this._historial = JSON.parse(localStorage.getItem('historial')! ) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')! ) || [];

  }

  //async
  buscarGifts( query: string) {
    const MAX_ITEMS = 10;
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, MAX_ITEMS);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    
    const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '10')
        .set('q', query);

    this.http.get<SearchGiftsResponse>(`${ this.servicioURL }/search`, { params })
      .subscribe( (resp ) => {
        //console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
    
    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=3jPYe7Bw2V41ObEjIYSaNqgkw6YYlo5P&q=dragon ball z&limit=10');
    // const data = await resp.json(); 
    // console.log(data);
   
    //console.log(this._historial);
  }

}
 