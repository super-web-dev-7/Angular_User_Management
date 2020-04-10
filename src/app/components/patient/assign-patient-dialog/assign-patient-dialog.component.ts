import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {HttpRequestService} from '../../../services/http-request.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-assign-patient-dialog',
    templateUrl: './assign-patient-dialog.component.html',
    styleUrls: ['./assign-patient-dialog.component.css']
})
export class AssignPatientDialogComponent implements OnInit {

    doctorList: any;
    selectedDoctor: any;
    submitted = false;
    selectedPatient: any;

    constructor(
        public dialogRef: MatDialogRef<AssignPatientDialogComponent>,
        private httpRequestService: HttpRequestService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.selectedPatient = data;
    }

    ngOnInit() {
        this.httpRequestService.getDoctor().subscribe(result => {
            this.doctorList = result;
        });
    }

    onItemListClick(doctor) {
        this.selectedDoctor = doctor;
    }

    onCancel() {
        this.selectedDoctor = null;
        this.dialogRef.close();
    }

    onSelect() {
        this.submitted = true;
        if (this.selectedDoctor == null) return;
        const data = {
            selectedPatient: this.selectedPatient.data._id,
            selectedDoctor: this.selectedDoctor
        };
        this.httpRequestService.assignDoctor(data).subscribe(result => {
            this.dialogRef.close();
        });

    }

}
