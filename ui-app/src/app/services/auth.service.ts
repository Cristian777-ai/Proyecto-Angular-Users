// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly BASE = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{token:string}> {
    return this.http.post<{token:string}>(`${this.BASE}/login`, { username, password })
      .pipe(
        tap(resp => localStorage.setItem('token', resp.token))
      );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
