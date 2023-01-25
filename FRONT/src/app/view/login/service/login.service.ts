import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/app/environments/environments';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URL = `${environments.baseUrl}/login`

  constructor(private http: HttpClient) { }

  makeLogin(body: Login): Observable<string> {
    return this.http.post<string>(this.URL, body)
  }
}
