import { Component, OnInit } from '@angular/core';
import { FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';
import { Router } from '@angular/router';
import { SuccessDialogComponent } from '../../../dialog/success-dialog/success-dialog.component';
import { AuthService } from '../../../service/authentication.service';

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
  usernameFormControl = new FormControl('', [Validators.required]);
  confirmationPasswordFormControl = new FormControl('', [Validators.required, this.checkPasswords]);

  constructor(private dialog: MatDialog,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  async onSignupButtonClick() {
    if (this.emailFormControl.valid && this.passwordFormControl.valid && this.usernameFormControl.valid && this.confirmationPasswordFormControl.valid) {
      const success = await this.authService.signup(this.emailFormControl.value, this.usernameFormControl.value, this.passwordFormControl.value);

      if (success) {
        this.openSuccessDialog();
      }
    } else {
      this.markAllFormControlsDirtyAndTouched();
    }
  }

  openSuccessDialog() {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      position: {
        top: '20rem',
      },
      data: {
        text: 'You have successfully signed up!',
      },
    });

    dialogRef.afterClosed().pipe(first()).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  markAllFormControlsDirtyAndTouched() {
    this.emailFormControl.markAsDirty();
    this.emailFormControl.markAsTouched();
    this.passwordFormControl.markAsDirty();
    this.passwordFormControl.markAsTouched();
    this.usernameFormControl.markAsDirty();
    this.usernameFormControl.markAsTouched();
    this.confirmationPasswordFormControl.markAsDirty();
    this.confirmationPasswordFormControl.markAsTouched();
  }
}
