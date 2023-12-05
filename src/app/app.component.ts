import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { User, UserRole } from './models/models';
import { AuthService } from './services';
import { HeaderComponent } from './parts/header/header.component';
import { FooterComponent } from './parts/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'void-forge-a-view';

  // An object representing the logged-in user's information.

  // Event emitter for logout action
  @Output() logout: EventEmitter<any> = new EventEmitter();

  // A reference to the MatSidenav instance to control its open and close behavior programmatically.
  @ViewChild('sidenav') sidenav?: MatSidenav;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  /**
   * A method to be called when the user clicks the logout button. This function would handle the logic for logging the user out of the application.
   */
  onLogout(): void {
    this.authService.logout();
    this.logout.emit();
    // Redirect to login page or perform other cleanup actions
  }

  // Function to toggle the sidenav
  toggleSidenav(): void {
    this.sidenav?.toggle();
  }
}
