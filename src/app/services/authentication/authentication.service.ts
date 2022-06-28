import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import IAuth from '../../interfaces/IAuth';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

const API = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) { }

  auth(body: IAuth): Observable<any> {
    const res = this.httpClient.post(`${API}/login`, body);
    res.subscribe({
      next: (resLogin: any) => {
        this.tokenService.setToken(resLogin.token);
        this.router.navigate(['home']);
      }
    });
    return res;
  }
}
