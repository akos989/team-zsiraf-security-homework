import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { SignupComponent } from './view/signup/signup.component';
import { EditCaffComponent } from './view/edit-caff/edit-caff.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'edit', component: EditCaffComponent },

  // for 404 pages
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

