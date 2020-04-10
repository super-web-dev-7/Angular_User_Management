import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

    currentUser: any;
    navLinks: any[];

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {
        this.navLinks = [
            {
                label: 'Member Management',
                link: '/dashboard',
                index: 0
            }, {
                label: 'Patient Management',
                link: '/patient',
                index: 1
            }
        ];
    }

    ngOnInit() {
        this.currentUser = this.authService.currentUserValue;
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

}
