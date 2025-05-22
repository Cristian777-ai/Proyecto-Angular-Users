
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;

}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}


  list(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL);
  }

  /**
   * 
   * @param id 
   */
  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${id}`);
  }
}