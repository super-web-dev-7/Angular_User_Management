import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpRequestService} from '../../../services/http-request.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-patient-dialog',
  templateUrl: './create-patient-dialog.component.html',
  styleUrls: ['./create-patient-dialog.component.css']
})
export class CreatePatientDialogComponent implements OnInit {

    submitted = false;
    createForm: FormGroup;
    error = '';

    constructor(
        public dialogRef: MatDialogRef<CreatePatientDialogComponent>,
        private formBuilder: FormBuilder,
        private httpRequestService: HttpRequestService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.createForm = this.formBuilder.group({
            name: ['', Validators.required],
        });
    }

    get f() {
        return this.createForm.controls;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    createUser() {
        this.submitted = true;
        if (this.createForm.invalid) {
            return;
        }

        const data = {
            name: this.f.name.value,
        };

        this.httpRequestService.createPatient(data).subscribe(result => {
            this.dialogRef.close(result);
        }, error => {
            this.error = error.error.message
        })
    }

}
