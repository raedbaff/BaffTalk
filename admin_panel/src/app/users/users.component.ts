import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { User } from '../user';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users:User[] = [];
  constructor(private AdminService:AdminService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.AdminService.getAllUsers().pipe(
      tap((response: any) => {
        console.log('response', response);
        this.users = response?.users;
      }),
      catchError((error: any) => {
        console.log(error);
        return of([]);
      })
    ).subscribe(
    )
  }

}
