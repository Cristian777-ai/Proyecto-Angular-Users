// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { tap, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // En desarrollo levanta tu json-server o Express en localhost:3000
  // En producción '' = mismo origen que el frontend
  private readonly BASE = '';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{token:string}> {
    // si quieres usar localhost en dev, puedes hacer:
    // const url = window.location.hostname === 'localhost'
    //   ? 'http://localhost:3000/auth/login'
    //   : '/auth/login';
    const url = '/auth/login';

    return this.http.post<{token:string}>(url, { username, password })
      .pipe(tap(resp => {
        localStorage.setItem('token', resp.token);
      }));
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
