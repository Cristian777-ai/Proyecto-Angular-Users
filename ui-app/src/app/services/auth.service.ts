import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  readonly isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{token:string}> {
    return this.http.post<{token:string}>('/auth/login', { username, password })
      .pipe(tap(resp => {
        localStorage.setItem('token', resp.token);
        this._isLoggedIn$.next(true);
      }));
  }

  logout() {
    localStorage.removeItem('token');
    this._isLoggedIn$.next(false);
  }
}
