import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';
import { BaseApi } from '../core/base-api';

@Injectable()
export class UsersService extends BaseApi {

  constructor (http: HttpClient) {
    super(http);
  }

  getByEmail(email: string): Observable<User> {
    return this.get(`users?email=${email}`)
      .map((users: User[]) => users.length ? users[0] : null);
  }

  createUser(user: User): Observable<User> {
    return this.post(`users`, user);
  }
}
