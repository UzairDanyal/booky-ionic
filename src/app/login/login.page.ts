import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../sdk/custom/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  
  loading: boolean;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) {}
  loginForm: FormGroup;

  ngOnInit() {
    this.formInitializer();
  }
  save() {
    const loginData = this.loginForm.value;
    console.log('loginData', loginData);
    this.userService.userLogin(loginData).subscribe(
      data => {
        console.log('got response from server', data);
        this.loading = false;
        this.router.navigateByUrl('/home');
      },
      error => {
        this.loading = false;
        console.log('error', error);
      }
    );
  }

  

  formInitializer() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }
}