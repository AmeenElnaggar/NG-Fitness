import { Component, effect, inject, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { MaterialModule } from '../../../../Core/modules/material.module';

@Component({
  selector: 'app-header',
  imports: [MaterialModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private authService = inject(AuthService);
  isAuth = this.authService.authChange();

  sidenavToggle = output<void>();

  constructor() {
    effect(() => (this.isAuth = this.authService.authChange()));
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
