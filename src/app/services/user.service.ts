import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  urlServer = 'http://51.79.26.171';
  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getUsers(id: any) {

    return new Promise((accept, reject) => {

      this.http.get(`${this.urlServer}/current_user/${id}`, { headers: this.httpHeaders }).subscribe(
        (response: any) => {
          accept(response);
        },
        (error) => {
          console.log(error + + ' error');

          if (error.status === 500) {
            reject('Error en el servidor');
          }

          reject('Error al obtener los Usuario');
        }
      );

    });

  }

  updateUser(user: any) {
    const user_params = {
      user
    }
    return new Promise((accept, reject) => {

      this.http
        .post(`${this.urlServer}/update/${user.id}`, user_params, {
          headers: this.httpHeaders,
        })
        .subscribe(
          (response: any) => {
            accept(response);
          },
          (error) => {
            console.log(error + ' error');

            if (error.status === 500) {
              reject('Error en el servidor');
            }

            reject('Error al actualizar los Usuario');
          }
        );

    });
  }


}
