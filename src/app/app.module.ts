import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from './material.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/auth/login/login.component';
import {JwtInterceptor} from './helper';

// service
import {AuthService} from './services/auth.service';
import {RegisterComponent} from './components/auth/register/register.component';
import {CreateUserDialog, DashboardComponent} from './components/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PatientComponent } from './components/patient/patient.component';
import { EditUserDialogComponent } from './components/dashboard/edit-user-dialog/edit-user-dialog.component';
import { CreatePatientDialogComponent } from './components/patient/create-patient-dialog/create-patient-dialog.component';
import { DeletePatientDialogComponent } from './components/patient/delete-patient-dialog/delete-patient-dialog.component';
import { AssignPatientDialogComponent } from './components/patient/assign-patient-dialog/assign-patient-dialog.component';
import {MatListModule} from '@angular/material';

// component

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        DashboardComponent, CreateUserDialog, EditUserDialogComponent,
        LayoutComponent,
        PageNotFoundComponent,
        PatientComponent,
        CreatePatientDialogComponent,
        DeletePatientDialogComponent,
        AssignPatientDialogComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatListModule
    ],
    entryComponents: [
        CreateUserDialog,
        EditUserDialogComponent,
        CreatePatientDialogComponent,
        DeletePatientDialogComponent,
        AssignPatientDialogComponent
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        HttpClientModule,
        HttpClient,
        AuthService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
