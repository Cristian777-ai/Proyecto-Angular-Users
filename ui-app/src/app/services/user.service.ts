// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly BASE = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {}

  list(): Observable<User[]> {
    return this.http.get<User[]>(this.BASE);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.BASE}/${id}`);
  }
}
