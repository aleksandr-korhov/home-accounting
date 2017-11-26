import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersService {
  constructor (private http: HttpClient) {}

  getByEmail(email: string): Observable<User> {
    return this.http
      .get(`http://localhost:3000/users?email=${email}`)
      .map((users: User[]) => users.length ? users[0] : null);
  }

  createUser(user: User): Observable<User> {
    return this.http.post(`http://localhost:3000/users`, user);
  }
}
