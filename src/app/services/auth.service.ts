import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiRoot = 'http://localhost:3000/api/users';
  user: User;
  isAuth = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  signup(data: User) {
    return this.http.post(`${this.apiRoot}/signup`, data);
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string; userId: string }>(
      `${this.apiRoot}/login`,
      {
        email,
        password,
      }
    );
  }
}
