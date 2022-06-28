import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JWT_LOCAL_STORAGE, USER_LOCAL_STORAGE } from 'src/app/config/constants';
import IUser from 'src/app/interfaces/IUser';
import { environment } from 'src/environments/environment';

const API = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  regiterUser(newUser: IUser) {
    return this.httpClient.post(`${API}/usuario`, {
      nome: newUser.nome,
      email: newUser.email,
      senha: newUser.senha
    });
  }

  getUserData() {
    return JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE) ?? '{}');
  }

  setUserData(data: string) {
    localStorage.setItem(USER_LOCAL_STORAGE, data);
  }

  logout() {
    localStorage.removeItem(USER_LOCAL_STORAGE);
    localStorage.removeItem(JWT_LOCAL_STORAGE);
    this.router.navigate(['']);
  }
}
