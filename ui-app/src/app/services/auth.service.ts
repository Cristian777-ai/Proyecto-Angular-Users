// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  readonly isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      '/auth/login',
      { username, password }
    ).pipe(
      tap(resp => {
        // 1) guardamos token
        localStorage.setItem('token', resp.token);
        // 2) emitimos que ahora estamos logueados
        this._isLoggedIn$.next(true);
      })
    );
  }

  logout(): void {
    // eliminamos token y emitimos estado
    localStorage.removeItem('token');
    this._isLoggedIn$.next(false);
  }

  // método para recuperarlo en interceptores o guardas
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
