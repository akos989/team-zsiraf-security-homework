import { Component, OnInit } from '@angular/core';
import { FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  checkPasswords: ValidatorFn = ():  ValidationErrors | null => {
    return this.passwordFormControl?.value === this.confirmationPasswordFormControl?.value ? null : { notSame: true }
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  confirmationPasswordFormControl = new FormControl('', [Validators.required, this.checkPasswords]);

  constructor() { }

  ngOnInit(): void {
  }
}
