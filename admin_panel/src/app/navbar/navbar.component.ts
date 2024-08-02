import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() user:User={};
  activeRoute: string = '';
  constructor(private router: Router,private authService:AuthService) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(()=>{
      this.activeRoute = this.router.url;
    })
  }
 
  isActiveRoute(route:string): boolean {
    return this.activeRoute === route;
  }

}
