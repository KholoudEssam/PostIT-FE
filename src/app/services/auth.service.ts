import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BEUrl = `${environment.apiUrl}/api/users`;

  user: User;
  isAuth = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  signup(data: User) {
    return this.http.post(`${this.BEUrl}/signup`, data);
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string; userId: string }>(
      `${this.BEUrl}/login`,
      {
        email,
        password,
      }
    );
  }
}
