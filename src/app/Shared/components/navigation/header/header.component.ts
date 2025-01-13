import { Component, inject, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { MaterialModule } from '../../../../Core/modules/material.module';

import { AuthService } from '../../../Services/auth.service';

import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../Store/store';
import { authSelector } from '../../../../Store/selectors/auth.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [MaterialModule, RouterLink, AsyncPipe],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private store = inject(Store<StoreInterface>);
  isAuth$: Observable<boolean> = this.store.select(authSelector);

  sidenavToggle = output<void>();

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
