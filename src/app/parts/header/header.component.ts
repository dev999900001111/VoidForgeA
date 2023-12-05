// src/app/parts/header.component.ts
import { Component, EventEmitter, Input, Output, OnInit, ViewChild } from '@angular/core';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../services';
import { User } from '../../models/models';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [MatToolbarModule, MatMenuModule, MatIconModule, RouterModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    // Input property to receive user data from the parent component
    @Input() user?: User;

    // Output property to emit an event when the user logs out
    @Output() logout = new EventEmitter<any>();

    // Constants for the paths used in the component
    readonly LOGO_PATH = 'assets/logo.png'; // Replace with the actual path to the logo
    readonly DASHBOARD_ROUTE = '/dashboard';
    readonly PROJECTS_ROUTE = '/projects';
    readonly PROFILE_ROUTE = '/profile';
    readonly SETTINGS_ROUTE = '/settings';

    // ViewChild to access the profile menu
    @ViewChild('profileMenu') profileMenu!: MatMenu;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        // Initialization logic can be added here if needed
    }

    // Function to handle the logout process
    onLogout(): void {
        this.authService.logout();
        this.logout.emit(); // Emit an event to inform the parent component about the logout
    }
}
// 
// Please note that the actual paths to the assets and routes should be replaced with the correct ones used in your application. The `AuthService` should have a `logout` method implemented that handles the logout logic, such as clearing the user's session and redirecting to the login page. The `logout.emit()` call in the `onLogout` function informs the parent component that the user has logged out, which can then take further actions like redirecting to the login screen.