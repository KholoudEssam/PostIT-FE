import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading = false;
  isErr = false;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}
  onSubmitForm(form: NgForm) {
    this.loading = true;

    const { password, email } = form.value;

    this.auth.login(email, password).subscribe(
      (res) => {
        localStorage.setItem('userId', res.userId);
        localStorage.setItem('token', res.token);
        this.auth.isAuth.next(true);
        this.router.navigate(['/']);
      },
      (err) => {
        this.isErr = true;
        console.log(err.error.msg);
        this.loading = false;
      }
    );
  }
}
