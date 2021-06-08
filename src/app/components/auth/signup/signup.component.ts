import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  loading = false;
  isErr = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}
  onSubmitForm(form: NgForm) {
    this.loading = true;
    const { name, password, email } = form.value;
    const data: User = {
      name,
      email,
      password,
    };
    this.auth.signup(data).subscribe(
      (user) => {
        // console.log(user);
        this.router.navigate(['/auth/login']);
      },
      (err) => {
        this.isErr = true;
        this.loading = false;
      }
    );
  }
}
