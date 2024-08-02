import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, filter, map, Observable, of, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  user: any;
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean> {

    return this.authService.fetchLoggedinUser().pipe(
      map((user) => {
        if (user.user) {
          
          console.log('user is logged in');
          console.log(user.user);
          return true;
        } else {
          console.log('user is not logged in');
          console.log(user);
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError((error) => {
        console.log('got error fetching user', error);
        this.router.navigate(['/login']);
        return of(false);
      })
    );
    // return this.authService.user$.pipe(
    //   take(1), // Ensure we only take the first emission and complete the observable
    //   map(user => {
    //     if (user) {
    //       console.log('user is logged in');
    //       console.log(user);
    //       return true; // User is logged in
    //     } else {
    //       console.log('user is not logged in');
    //       console.log(user);
    //       this.router.navigate(['/login']);
    //       return false; // User is not logged in
    //     }
    //   }),
    //   catchError(error => {
    //     console.log('got error fetching user',error);
    //     this.router.navigate(['/login']);
    //     return of(false); // Return false if there's an error
    //   })
    // );
  }
}
