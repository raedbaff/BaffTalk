import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { catchError, filter, of, tap } from 'rxjs';
import { AdminService } from '../admin.service';
import { User } from '../user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  groups:any=[];
  users:User[]=[];
  constructor(private adminService: AdminService, private authService:AuthService) {
    this.groups = [
      {
        id: 1,
        name: 'Group 1',
        users: [
          { id: 1, name: 'User 1' },
          { id: 2, name: 'User 2' },
          { id: 3, name: 'User 3' }
        ],
        interactions:5
      },
      {
        id: 2,
        name: 'Group 2',
        users: [
          { id: 1, name: 'User 1' },
          { id: 2, name: 'User 2' },
          { id: 3, name: 'User 3' }
        ],
        interactions:8
      },
      {
        id: 3,
        name: 'Group 3',
        users: [
          { id: 1, name: 'User 1' },
          { id: 2, name: 'User 2' },
          { id: 3, name: 'User 3' }
        ],
        interactions:3
      }
      
    ];
  }
  ngOnInit(): void {
    this.adminService.getAllUsers().pipe(
      tap((response:any) => {
        this.users = response.users;
      } ),catchError((error:any) => {
        console.log(error);
        return of([]);
        
      }
    )
  ).subscribe();

 
  
  
  
    
  }
  


}
