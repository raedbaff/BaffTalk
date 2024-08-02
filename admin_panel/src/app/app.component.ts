import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, TopbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  connectedUser: any;
  constructor(private router: Router, public authService: AuthService) {}
  ngOnInit(): void {
    
    this.authService.fetchLoggedinUser().subscribe({
      next: (data) => {
        this.connectedUser = data.user;
        this.authService.userSignal.set(data.user);
        console.log("connected user from app component is: ", this.authService.userSignal());
        
      },
      error: (error) => {
        this.connectedUser = null;
      },
    });
  }
}
