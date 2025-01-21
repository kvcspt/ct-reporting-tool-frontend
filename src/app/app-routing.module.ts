import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CtStudiesComponent } from './ct-studies/ct-studies.component';
import { AuthService } from './auth/auth.service';
import { TemplateManagementComponent } from './template-management/template-management.component';
import { authGuard, defaultRouteGuard } from './auth/auth.guard';
import { DicomViewerComponent } from './dicom-viewer/dicom-viewer.component';
import { UserProfileComponent } from './user/user-profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'ct-studies',
    component: CtStudiesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'dicom-viewer',
    component: DicomViewerComponent,
    canActivate: [authGuard],
  },
  {
    path: 'templates',
    component: TemplateManagementComponent,
    canActivate: [authGuard],
  },
  {
    path: 'user-update',
    component: UserProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    children: [],
    canActivate: [defaultRouteGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  public constructor(public authService: AuthService) {}
}
