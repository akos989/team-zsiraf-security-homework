import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLoginButtonClick() {
    if (this.usernameFormControl.valid && this.passwordFormControl.valid) {
      this.authService.login(this.usernameFormControl.value, this.passwordFormControl.value);
    } else {
      this.markAllFormControlsDirtyAndTouched();
    }
  }

  markAllFormControlsDirtyAndTouched() {
    this.usernameFormControl.markAsDirty();
    this.usernameFormControl.markAsTouched();
    this.passwordFormControl.markAsDirty();
    this.passwordFormControl.markAsTouched();
  }
}
