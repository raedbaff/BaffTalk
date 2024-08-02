import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
  @Input() user:User={};
  drowdown = false;
  searchForm = new FormGroup({
    search: new FormControl('',[Validators.required, Validators.minLength(3)])
  })
  constructor(private authService:AuthService,private router:Router) {}
 
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
