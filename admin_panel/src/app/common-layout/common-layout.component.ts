import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-common-layout',
  standalone: true,
  imports: [NavbarComponent,TopbarComponent,RouterOutlet],
  templateUrl: './common-layout.component.html',
  styleUrl: './common-layout.component.css'
})

export class CommonLayoutComponent {
  user:User={};
  constructor(private authService:AuthService) {}
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

}
