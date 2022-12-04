import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './view/shared/login/login.component';
import {SignupComponent} from './view/shared/signup/signup.component';
import {EditCaffComponent} from './view/edit-caff/edit-caff.component';
import {NeutralListComponent} from "./view/client/neutral-list/neutral-list.component";
import {UploadedListComponent} from "./view/client/uploaded-list/uploaded-list.component";
import {PurchasedListComponent} from "./view/client/purchased-list/purchased-list.component";
import {ClientBaseComponent} from "./view/client/client-base/client-base.component";
import {AdminBaseComponent} from "./view/admin/admin-base/admin-base.component";
import {AdminListComponent} from "./view/admin/admin-list/admin-list.component";
import {AdminCaffDetailComponent} from "./view/admin/admin-caff-detail/admin-caff-detail.component";
import {ClientCaffDetailComponent} from "./view/client/client-caff-detail/client-caff-detail.component";

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  // client page routes
  { path: 'client', component: ClientBaseComponent,
    children:[
      { path: '', component: NeutralListComponent },
      { path: 'uploaded', component: UploadedListComponent },
      { path: 'purchased', component: PurchasedListComponent },
      { path: ':id/caff-detail', component: ClientCaffDetailComponent },
      { path: 'upload-new-caff', component: EditCaffComponent }
    ]
  },
  // admin page routes
  { path: 'admin', component: AdminBaseComponent,
    children:[
      { path: '', component: AdminListComponent },
      { path: ':id/caff-detail', component: AdminCaffDetailComponent },
      { path: ':id/edit-caff', component: EditCaffComponent }
    ]
  },
  // for 404 pages
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

