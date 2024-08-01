import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  user:any;
  activeRoute: string = '';
  constructor(private router: Router,private authService:AuthService) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(()=>{
      this.activeRoute = this.router.url;
    })
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.authService.fetchLoggedinUser().subscribe({
      next: (data) => {

        this.user = data.user;
      },error : (error) => {
        console.log(error);
      }
    })
  }
  isActiveRoute(route:string): boolean {
    return this.activeRoute === route;
  }

}
