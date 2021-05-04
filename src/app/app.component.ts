import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private authService: AuthService) {
    if (localStorage.getItem('token')) {
      this.authService.isAuth.next(true);
    }
  }
  title = 'doki-doki';
}
