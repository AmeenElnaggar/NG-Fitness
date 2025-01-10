import { Component, effect, inject, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { MaterialModule } from '../../../../Core/modules/material.module';

@Component({
  selector: 'app-sidenav-list',
  imports: [MaterialModule, RouterLink],
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.css',
})
export class SidenavListComponent {
  private authService = inject(AuthService);
  isAuth = this.authService.authChange();

  closeSideNav = output<void>();

  constructor() {
    effect(() => (this.isAuth = this.authService.authChange()));
  }

  onClose() {
    this.closeSideNav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }
}
