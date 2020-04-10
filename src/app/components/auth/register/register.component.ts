import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';

import {AuthService} from '../../../services/auth.service';

interface Role {
    value: number;
    viewValue: string;
}

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

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
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
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

    // convenience getter for easy access to form fields
    get f() {
        return this.registerForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }
        this.authService.register(this.f.firstName.value, this.f.lastName.value, this.f.email.value, this.f.password.value, this.selected)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['login']);
                },
                error => {
                    this.error = error.error.message;
                });
    }
}
