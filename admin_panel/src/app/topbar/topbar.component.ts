import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  user: any;
  drowdown = false;
  searchForm = new FormGroup({
    search: new FormControl('',[Validators.required, Validators.minLength(3)])
  })
  constructor(private authService:AuthService,private router:Router) {}
  ngOnInit(): void {
    this.authService.fetchLoggedinUser().subscribe({
      next: (data) => {
        this.user = data.user;
      },error : (error) => {
        console.log(error);
      }
    })
    
  }
  handleDropdown() {
    this.drowdown = !this.drowdown;
  }

  handleSubmit() {
    if (this.searchForm.invalid) {
      return;
    }
    alert(this.searchForm.value.search);
    this.searchForm.reset();
  }

}
