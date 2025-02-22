import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CtStudiesComponent } from './ct-studies/ct-studies.component';
import { ScanTableComponent } from './ct-studies/scan-table/scan-table.component';
import { ScanUploadComponent } from './ct-studies/scan-upload/scan-upload.component';
import { TemplateManagementComponent } from './template-management/template-management.component';
import { TemplateDialogComponent } from './template-management/template-dialog/template-dialog.component';
import { DeleteDialogComponent } from './template-management/template-dialog/delete-dialog/delete-dialog.component';
import { SectionDialogComponent } from './template-management/template-dialog/section-dialog/section-dialog.component';
import { DicomViewerComponent } from './dicom-viewer/dicom-viewer.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { ReportComponent } from './dicom-viewer/report/report.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ViewerModule } from 'ng-cornerstone';
import { UserProfileComponent } from './user/user-profile.component';
import { BodyReportComponent } from './dicom-viewer/report/body-report/body-report.component';
import { KneeComponent } from './dicom-viewer/report/body-report/body-components/knee/knee.component';
import { AbdomenComponent } from './dicom-viewer/report/body-report/body-components/abdomen/abdomen.component';
import { ChestComponent } from './dicom-viewer/report/body-report/body-components/chest/chest.component';
import { LiverComponent } from './dicom-viewer/report/body-report/body-components/liver/liver.component';
import { BodyTemplateDialogComponent } from './template-management/body-template-dialog/body-template-dialog.component';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    CtStudiesComponent,
    ScanTableComponent,
    ScanUploadComponent,
    TemplateManagementComponent,
    TemplateDialogComponent,
    DeleteDialogComponent,
    SectionDialogComponent,
    DicomViewerComponent,
    ReportComponent,
    UserProfileComponent,
    BodyReportComponent,
    KneeComponent,
    AbdomenComponent,
    ChestComponent,
    LiverComponent,
    BodyTemplateDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    ViewerModule.forRoot(),
    MatListModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS,
    },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
