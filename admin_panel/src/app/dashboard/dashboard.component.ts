import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { catchError, filter, of, tap } from 'rxjs';
import { AdminService } from '../admin.service';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  groups: any = [];
  users: User[] = [];
  stats: any;
  constructor(
    private adminService: AdminService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.adminService
      .getTop3Users()
      .pipe(
        tap((response: any) => {
          console.log('response', response);
          
          this.users = response;
        }),
        catchError((error: any) => {
          console.log(error);
          return of([]);
        })
      )
      .subscribe();

    this.adminService
      .getStats()
      .pipe(
        tap((response: any) => {
          this.stats = response;
        }),
        catchError((error: any) => {
          console.log(error);
          return of([]);
        })
      )
      .subscribe();

    this.adminService
      .geteGroups()
      .pipe(
        filter((response: any) => {
          console.log('response', response);

          for (let group of response) {
            group.groupImage = `${environment.apiUrl}/group/photo/${group._id}`;
          }
          return response;
        }),
        tap((response: any) => {
          this.groups = response;
        }),
        catchError((error: any) => {
          console.log(error);
          return of([]);
        })
      )
      .subscribe();
  }
}
