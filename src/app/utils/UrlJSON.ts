import {environment} from '../../environments/environment';

const baseUrl = environment.baseUrl;
const apiUrl = environment.apiUrl;

export const UrlJSON = {
    loginUrl: apiUrl + 'auth/login',
    signupUrl: apiUrl + 'auth/signup',
    getUsersUrl: apiUrl + 'user',
    getPatientUrl: apiUrl + 'patient'
};
