import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { AuthGuard } from './auth.guard';
import { ContactusComponent } from './contactus/contactus.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent , canActivate: [AuthGuard] },
  { path: 'productDashboard', component: ProductDashboardComponent},
  { path: 'contactus', component: ContactusComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
