import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {
  constructor (private http: HttpClient) {}

  getByEmail(email: string) {
    return this.http
      .get(`http://localhost:3000/users?email=${email}`)
      .map((users: User[]) => users.length ? users[0] : null);
  }
}
