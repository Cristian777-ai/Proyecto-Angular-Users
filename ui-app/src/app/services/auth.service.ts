
import { Injectable } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap }         from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly BASE = 'http://localhost:3000';
  private _isLoggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  readonly isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.BASE}/auth/login`, { username, password })
      .pipe(
        tap(resp => {
         
          this.setToken(resp.token);
        })
      );
  }

 
  setToken(token: string): void {
    localStorage.setItem('token', token);
    this._isLoggedIn$.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    this._isLoggedIn$.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}