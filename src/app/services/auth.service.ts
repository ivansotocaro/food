import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlServer = 'http://51.79.26.171';
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient
  ) { }

  loginUserAuth(credentials: any) {

    return new Promise((accept, reject) => {
      // email: andreavecino@gmail.com
      let params = {
        "user": {...credentials}
      }

      this.http.post(`${this.urlServer}/login`, params, {headers: this.httpHeaders})
      .subscribe((response: any) => {

        if(response.status !== 'OK'){
          reject(response);
        }

        accept(response);

      },
      (error) => {
        console.log(error);

        if (error.status === 422) {
          reject('Usuario o contraseña incorrecta');
        }

        if(error.status === 500){
          reject('Error en el servidor');
        }

        reject('Error al iniciar sesión');

      }
      )

    })

  }

}
