import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loginUserAuth(credentials: any) {
    
    return new Promise((accept, reject) => {

      if (credentials.email !== 'ivan@gmail.com') {
        return reject('Usuario incorrecto');
      }

      if (credentials.password !== '123456') {
        return reject('Contraseña incorrecta');
      }

      return accept('Login correcto');

    })

  }

}
