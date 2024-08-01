import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  user: any;
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): any {

    this.authService.fetchLoggedinUser().subscribe({
      next: (data) => {
        return true;
      },
      error: (error) => {
        console.log(error);
        this.router.navigate(['/login']);
        
        return false;
      },
    });

  }

}
