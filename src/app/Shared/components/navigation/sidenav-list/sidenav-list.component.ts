import { Component, inject, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { AuthService } from '../../../Services/auth.service';

import { MaterialModule } from '../../../../Core/modules/material.module';

import { Store } from '@ngrx/store';
import { StoreInterface } from '../../../../Store/store';
import { authSelector } from '../../../../Store/selectors/auth.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  imports: [MaterialModule, RouterLink, AsyncPipe],
  standalone: true,
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.css',
})
export class SidenavListComponent {
  private authService = inject(AuthService);
  private store = inject(Store<StoreInterface>);
  isAuth$: Observable<boolean> = this.store.select(authSelector);

  closeSideNav = output<void>();

  onClose() {
    this.closeSideNav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }
}
