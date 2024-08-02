import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-common-layout',
  standalone: true,
  imports: [NavbarComponent,TopbarComponent,RouterOutlet],
  templateUrl: './common-layout.component.html',
  styleUrl: './common-layout.component.css'
})
export class CommonLayoutComponent {

}
