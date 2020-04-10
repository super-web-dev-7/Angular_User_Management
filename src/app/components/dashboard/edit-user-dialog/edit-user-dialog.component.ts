import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpRequestService} from '../../../services/http-request.service';
import {Router} from '@angular/router';

interface Role {
    value: number;
    viewValue: string;
}

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})

export class EditUserDialogComponent implements OnInit {

    submitted = false;
    editForm: FormGroup;
    error = '';
    roles: Role[] = [
        {value: 0, viewValue: 'Doctor'},
        {value: 1, viewValue: 'Nurse'},
        {value: 2, viewValue: 'Admin'}
    ];
    selected = 0;
    userData: any;

    constructor(
        public dialogRef: MatDialogRef<EditUserDialogComponent>,
        private formBuilder: FormBuilder,
        private httpRequestService: HttpRequestService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.userData = data;
        this.selected = this.userData.data.role;
    }

    ngOnInit() {

        this.editForm = this.formBuilder.group({
            firstName: [this.userData.data.firstName, Validators.required],
            lastName: [this.userData.data.lastName, Validators.required],
            email: [this.userData.data.email, Validators.required],
            password: ['', Validators.required],
        });
    }

    get f() {
        return this.editForm.controls;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    editUser() {
        this.submitted = true;
        if (this.editForm.invalid) {
            return;
        }

        const data = {
            id: this.userData.data._id,
            firstName: this.f.firstName.value,
            lastName: this.f.lastName.value,
            email: this.f.email.value,
            password: this.f.password.value,
            role: this.selected
        };
        this.httpRequestService.editUser(data).subscribe(result => {
            this.dialogRef.close(result);
        }, error => {
            this.error = error.error.message
        })
    }

}
