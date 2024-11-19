import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CtStudiesComponent } from './ct-studies/ct-studies.component';
import { AuthService } from './auth/auth.service';
//import { authGuard } from './auth/auth.guard';
import { TemplateManagementComponent } from './template-management/template-management.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'ct-studies',
    component: CtStudiesComponent,
    //canActivate: [authGuard],
  },
  { path: 'templates', component: TemplateManagementComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  public constructor(public authService: AuthService) {}
}
