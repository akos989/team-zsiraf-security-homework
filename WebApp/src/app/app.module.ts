import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderInterceptor} from './interceptor/loader.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {LoginComponent} from './view/shared/login/login.component';
import {SignupComponent} from './view/shared/signup/signup.component';
import {SuccessDialogComponent} from './dialog/success-dialog/success-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {ClientNavigationBarComponent} from './component/client-navigation-bar/client-navigation-bar.component';
import {LoadingComponent} from './view/shared/loading/loading.component';
import {NeutralListComponent} from './view/client/neutral-list/neutral-list.component';
import {PurchasedListComponent} from './view/client/purchased-list/purchased-list.component';
import {UploadedListComponent} from './view/client/uploaded-list/uploaded-list.component';
import {CaffDetailComponent} from "./component/caff-detail/caff-detail.component";
import {ListComponent} from "./component/list/list.component";
import { ClientBaseComponent } from './view/client/client-base/client-base.component';
import { AdminBaseComponent } from './view/admin/admin-base/admin-base.component';
import { AdminListComponent } from './view/admin/admin-list/admin-list.component';
import { AdminCaffDetailComponent } from './view/admin/admin-caff-detail/admin-caff-detail.component';
import { ClientCaffDetailComponent } from './view/client/client-caff-detail/client-caff-detail.component';
import { CommentListComponent } from './component/comment-list/comment-list.component';
import { AdminNavigationBarComponent } from './component/admin-navigation-bar/admin-navigation-bar.component';
import { ErrorDialogComponent } from './dialog/error-dialog/error-dialog.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditCaffComponent } from './view/edit-caff/edit-caff.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FileSaverModule } from 'ngx-filesaver';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SuccessDialogComponent,
    ErrorDialogComponent,
    LoadingComponent,
    EditCaffComponent,
    SuccessDialogComponent,
    ClientNavigationBarComponent,
    NeutralListComponent,
    PurchasedListComponent,
    UploadedListComponent,
    CaffDetailComponent,
    ListComponent,
    ClientBaseComponent,
    AdminBaseComponent,
    AdminListComponent,
    AdminCaffDetailComponent,
    ClientCaffDetailComponent,
    CommentListComponent,
    AdminNavigationBarComponent,
    LoadingComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatCardModule,
        MatExpansionModule,
        MatListModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatProgressSpinnerModule,
        NgxDropzoneModule,
        FormsModule,
        FileSaverModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
