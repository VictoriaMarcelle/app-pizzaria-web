import { Injectable } from '@angular/core';
import { JWT_LOCAL_STORAGE } from '../../config/constants';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken() {
    return localStorage.getItem(JWT_LOCAL_STORAGE) ?? '';
  }

  setToken(token: string) {
    localStorage.setItem(JWT_LOCAL_STORAGE, token);
  }

  hasToken() {
    return !!this.getToken();
  }
}
