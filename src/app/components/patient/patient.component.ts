import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AuthService} from '../../services/auth.service';
import {HttpRequestService} from '../../services/http-request.service';
import {CreatePatientDialogComponent} from './create-patient-dialog/create-patient-dialog.component';
import {DeletePatientDialogComponent} from './delete-patient-dialog/delete-patient-dialog.component';
import {AssignPatientDialogComponent} from './assign-patient-dialog/assign-patient-dialog.component';

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
    displayedColumns: string[] = ['name', 'createdAt'];
    dataSource: any = new MatTableDataSource<any>();
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    currentUser: any;

    constructor(
        private authService: AuthService,
        private httpRequestService: HttpRequestService,
        private dialog: MatDialog
    ) {
    }

    ngOnInit() {
        this.currentUser = this.authService.currentUserValue;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if (this.currentUser.user.role == 2)
        {
            this.displayedColumns.splice(1, 0, 'doctor');
            this.displayedColumns.push('delete');
            this.httpRequestService.getPatients().subscribe(result => {
                this.dataSource.data = result;
            });
        } else if (this.currentUser.user.role == 0) {
            console.log(this.currentUser.user)
            this.httpRequestService.getPatientsByDoctorId(this.currentUser.user._id).subscribe(result => {
                this.dataSource.data = result;
                console.log(result);
            })
        }
    }

    openCreatePatientDialog() {
        const createDialogRef = this.dialog.open(CreatePatientDialogComponent, {
        });
        createDialogRef.afterClosed().subscribe(result => {
            this.httpRequestService.getPatients().subscribe(data => {
                this.dataSource.data = data;
            });
        });
    };

    deleteUser(data) {
        console.log(data)
        const deleteDialogRef = this.dialog.open(DeletePatientDialogComponent, {
            data: {data: data}
        });
        deleteDialogRef.afterClosed().subscribe(result => {
            this.httpRequestService.getPatients().subscribe(data => {
                this.dataSource.data = data;
            });
        });
    }

    assignPatient(data) {
        const assignDialogRef = this.dialog.open(AssignPatientDialogComponent, {
            data: {data: data},
            width: '50%'
        });

        assignDialogRef.afterClosed().subscribe(result => {
            this.httpRequestService.getPatients().subscribe(data => {
                this.dataSource.data = data;
            })
        });
    }

}
