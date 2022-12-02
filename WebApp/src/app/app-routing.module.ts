import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { SignupComponent } from './view/signup/signup.component';
import {ListComponent} from "./view/list/list.component";
import {CaffDetailComponent} from "./view/caff-detail/caff-detail.component";

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'list', component: ListComponent },
  { path: 'uploaded', component: ListComponent },
  { path: 'purchased', component: ListComponent },
  { path: 'detail', component: CaffDetailComponent },

  // for 404 pages
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

