import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderInterceptor } from './interceptor/loader.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './view/login/login.component';
import { SignupComponent } from './view/signup/signup.component';
import { SuccessDialogComponent } from './dialog/success-dialog/success-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from './dialog/error-dialog/error-dialog.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingComponent } from './view/loading/loading.component';
import { EditCaffComponent } from './view/edit-caff/edit-caff.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SuccessDialogComponent,
    ErrorDialogComponent,
    LoadingComponent,
    EditCaffComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    NgxDropzoneModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
