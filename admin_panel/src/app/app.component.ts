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
  keepLayout: boolean = true;
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    console.log(environment.apiUrl)
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.keepLayout = !this.router.url.includes('login');
      });
    this.authService.fetchLoggedinUser().subscribe({
      next: (data) => {
        this.connectedUser = data.user;
      },
      error: (error) => {

        this.connectedUser = null;
      },
    });
  }
}
