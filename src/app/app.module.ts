import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatCard } from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatInput } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { MatOption } from "@angular/material/autocomplete";
import { MatSelect } from "@angular/material/select";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CtStudiesComponent } from './ct-studies/ct-studies.component';
import {MatList, MatListItem} from "@angular/material/list";
import {MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import { ScanTableComponent } from './ct-studies/scan-table/scan-table.component';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    CtStudiesComponent,
    ScanTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormField,
    MatCard,
    ReactiveFormsModule,
    MatButton,
    MatInput,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    MatOption,
    MatSelect,
    MatLabel,
    MatError,
    HttpClientModule,
    MatListItem,
    MatList,
    FormsModule,
    MatDialogContent,
    MatDialogTitle,
    MatTable,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatHeaderCell,
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
