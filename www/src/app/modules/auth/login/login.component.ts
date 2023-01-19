import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}

  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {}

  login() {
    this.http
      .post<any>(`${environment.apiUrl}/auth/login`, this.form.value)
      .subscribe({
        next: (res) => {
          localStorage.setItem('jwt', res.accessToken);
          this.router.navigateByUrl('todo');
        },
        error: (err) => {
          alert(err.message);
        },
      });
  }
}
