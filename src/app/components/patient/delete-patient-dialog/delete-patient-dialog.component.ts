import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpRequestService} from '../../../services/http-request.service';

@Component({
    selector: 'app-delete-patient-dialog',
    templateUrl: './delete-patient-dialog.component.html',
    styleUrls: ['./delete-patient-dialog.component.css']
})
export class DeletePatientDialogComponent implements OnInit {

    userData: any;

    constructor(
        public dialogRef: MatDialogRef<DeletePatientDialogComponent>,
        private httpRequestService: HttpRequestService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.userData = data;
    }

    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    deletePatient() {
        this.httpRequestService.deletePatient(this.userData.data._id).subscribe(result => {
            this.dialogRef.close();
        });
    }

}
