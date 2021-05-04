import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuth: boolean;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isAuth.subscribe((res) => {
      this.isAuth = res;
      console.log(res);
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.authService.isAuth.next(false);
    this.router.navigate(['/']);
  }
}
