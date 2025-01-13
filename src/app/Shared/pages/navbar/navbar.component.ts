import { Component } from '@angular/core';

import { MaterialModule } from '../../../Core/modules/material.module';

import { HeaderComponent } from '../../components/navigation/header/header.component';
import { SidenavListComponent } from '../../components/navigation/sidenav-list/sidenav-list.component';

@Component({
  selector: 'app-navbar',
  imports: [MaterialModule, HeaderComponent, SidenavListComponent],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
