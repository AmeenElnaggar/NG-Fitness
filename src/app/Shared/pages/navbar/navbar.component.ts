import { Component, OnInit, viewChild } from '@angular/core';
import { HeaderComponent } from '../../components/navigation/header/header.component';
import { SidenavListComponent } from '../../components/navigation/sidenav-list/sidenav-list.component';
import { MaterialModule } from '../../../Core/modules/material.module';

@Component({
  selector: 'app-navbar',
  imports: [MaterialModule, HeaderComponent, SidenavListComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
