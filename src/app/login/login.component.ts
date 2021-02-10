import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(public router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
   });
  }

  ngOnInit() {
  }

  onLogin(){
    sessionStorage.setItem('User', this.loginForm.value.username);
    localStorage.setItem('isLoggedIn', 'true');
    this.router.navigateByUrl('/home')
    .then(() => {
      location.reload();
    });
  }

}
