import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../../services/auth.service';
import {HttpRequestService} from '../../services/http-request.service';
import {element} from 'protractor';
import {EditUserDialogComponent} from './edit-user-dialog/edit-user-dialog.component';

interface Role {
    value: number;
    viewValue: string;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'createdAt'];
    dataSource: any = new MatTableDataSource<any>();
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    currentUser: any;
    role = ['Doctor', 'Nurse', 'Admin'];
    patients: any;

    constructor(
        private authService: AuthService,
        private router: Router,
        private httpRequestService: HttpRequestService,
        private dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.currentUser = this.authService.currentUserValue;
        if (this.currentUser.user.role == 2) this.displayedColumns.push('edit');
        this.httpRequestService.getUsers().subscribe(result => {
            this.dataSource.data = result;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
        if (this.currentUser.user.role == 2) {
            this.httpRequestService.getPatients().subscribe(result => {
                this.patients = result;
                console.log(result)
            })
        }
    }

    openCreateUserDialog(): void {
        const dialogRef = this.dialog.open(CreateUserDialog, {
            width: '50%'
        });

        dialogRef.afterClosed().subscribe(result => {
            this.httpRequestService.getUsers().subscribe(result => {
                this.dataSource.data = result;
            })
        });
    }

    editUser(data) {
        const editDialogRef = this.dialog.open(EditUserDialogComponent, {
            width: '50%',
            data: {data: data}
        });

        editDialogRef.afterClosed().subscribe(result => {
            this.httpRequestService.getUsers().subscribe(result => {
                this.dataSource.data = result;
            })
        });
    }

    onSelect(data) {
        console.log(data.doctorId)
        if (data.doctorId != null)  {
            this.dataSource.data = [data.doctorId];
        } else {
            this.dataSource.data = [];
        }
    }

    onClear() {
        this.httpRequestService.getUsers().subscribe(result => {
            this.dataSource.data = result;
        })
    }
}

@Component({
    selector: 'create-user-dialog',
    template: `<h2 mat-dialog-title>Create User </h2>
    <form [formGroup]="registerForm" (ngSubmit)="createUser()">
        <div mat-dialog-content>
            <div class="form-group">
                <mat-form-field class="full-width">
                    <input type="text" matInput placeholder="Enter your firstname" formControlName="firstName"
                           autofocus required>
                    <mat-error *ngIf="submitted && f.firstName.hasError('required')">FirstName is required
                    </mat-error>
                </mat-form-field>
            </div>
            <div class="form-group">
                <mat-form-field class="full-width">
                    <input type="text" matInput placeholder="Enter your lastname" formControlName="lastName"
                           required>
                    <mat-error *ngIf="submitted && f.lastName.hasError('required')">LastName is required</mat-error>
                </mat-form-field>
            </div>
            <div class="form-group">
                <mat-form-field class="full-width">
                    <input type="email" matInput placeholder="Enter your email" formControlName="email" required>
                    <mat-error *ngIf="submitted && f.email.hasError('required')">Email is required</mat-error>
                </mat-form-field>
            </div>
            <div class="form-group">
                <mat-form-field class="full-width">
                    <input type="password" matInput placeholder="Enter your password" formControlName="password"
                           required>
                    <mat-error *ngIf="submitted && f.password.hasError('required')">Password is required</mat-error>
                </mat-form-field>
            </div>
            <div class="form-group">
                <mat-form-field>
                    <mat-label>Select Role...</mat-label>
                    <mat-select [(value)]="selected">
                        <mat-option *ngFor="let role of roles" [value]="role.value">
                            {{role.viewValue}}
                        </mat-option>
                    </mat-select>
                </mat-form-field>
            </div>
            <div class="form-group">
                <button type="submit" mat-button  class="full-width btn-success">Register</button>
            </div>
            <div *ngIf="error" class="alert alert-danger">{{error}}</div>

        </div>
        <div mat-dialog-actions>
            <button mat-button (click)="onNoClick()" class="full-width">Cancel</button>
        </div>
    </form>`
})

export class CreateUserDialog {

    submitted = false;
    registerForm: FormGroup;
    error = '';
    roles: Role[] = [
        {value: 0, viewValue: 'Doctor'},
        {value: 1, viewValue: 'Nurse'},
        {value: 2, viewValue: 'Admin'}
    ];
    selected = 0;

    constructor(
        public dialogRef: MatDialogRef<CreateUserDialog>,
        private formBuilder: FormBuilder,
        private httpRequestService: HttpRequestService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    get f() {
        return this.registerForm.controls;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    createUser() {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }

        const data = {
            firstName: this.f.firstName.value,
            lastName: this.f.lastName.value,
            email: this.f.email.value,
            password: this.f.password.value,
            role: this.selected
        };
        this.httpRequestService.addUser(data).subscribe(result => {
            this.dialogRef.close(result);
        }, error => {
            this.error = error.error.message
        })
    }
}
