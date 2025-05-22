// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  // Igual: en dev apunta a localhost:3000, en prod usa rutas relativas
  private readonly BASE = '/users';

  constructor(private http: HttpClient) {}

  list(): Observable<User[]> {
    return this.http.get<User[]>(this.BASE);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.BASE}/${id}`);
  }
}
