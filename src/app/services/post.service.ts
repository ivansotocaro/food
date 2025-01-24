import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class PostService {
  urlServer = 'http://51.79.26.171';
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getPosts() {

    return new Promise((accept, reject) => {

      this.http.get(`${this.urlServer}/posts`, { headers: this.httpHeaders }).subscribe(
        (response: any) => {
          accept(response);
        },
        (error) => {
          console.log(error + + ' error');

          if (error.status === 500) {
            reject('Error en el servidor');
          }

          reject('Error al obtener los Posts');
        }
      );

    });

  }

}
