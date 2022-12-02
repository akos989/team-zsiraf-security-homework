import { Component, OnInit } from '@angular/core';
import { FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';
import { Router } from '@angular/router';
import { SuccessDialogComponent } from '../../dialog/success-dialog/success-dialog.component';
import {HttpClient} from "@angular/common/http";

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
              private router: Router,
              private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSignupButtonClick() {
    this.http.get<any>('https://api.openweathermap.org/data/2.5/weather?lat=47.497913&lon=19.040236&appid=107eca7031d101001ab347376dbe2747')
      .subscribe(data => {
        console.log(data);
      })

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
