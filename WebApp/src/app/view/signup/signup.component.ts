import { Component, OnInit } from '@angular/core';
import { FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';
import { Router } from '@angular/router';
import {SuccessDialogComponent} from "../../dialog/success-dialog/success-dialog.component";

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

  constructor(private dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSignupButtonClick() {
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
}
