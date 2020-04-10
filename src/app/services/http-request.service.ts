import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlJSON} from '../utils/UrlJSON';

@Injectable({
    providedIn: 'root'
})
export class HttpRequestService {

    constructor(private http:HttpClient) {
    }

    getUsers() {
        return this.http.get(`${UrlJSON.getUsersUrl}/getUsers`);
    }

    getDoctor() {
        return this.http.get(`${UrlJSON.getUsersUrl}/getDoctors`);
    }

    addUser(data) {
        return this.http.post(`${UrlJSON.getUsersUrl}/addUser`, data);
    }

    editUser(data) {
        return this.http.post(`${UrlJSON.getUsersUrl}/editUser`, data);
    }

    getPatients() {
        return this.http.get(`${UrlJSON.getPatientUrl}/getAllPatients`);
    }

    getPatientsByDoctorId(id) {
        return this.http.get(`${UrlJSON.getPatientUrl}/getPatientsByDoctorId/${id}`);
    }

    createPatient(data) {
        return this.http.post(`${UrlJSON.getPatientUrl}/createPatient`, data);
    }

    deletePatient(id) {
        return this.http.delete(`${UrlJSON.getPatientUrl}/deletePatient/${id}`)
    }

    assignDoctor(data) {
        return this.http.post(`${UrlJSON.getPatientUrl}/assignDoctor`, data)
    }

}
