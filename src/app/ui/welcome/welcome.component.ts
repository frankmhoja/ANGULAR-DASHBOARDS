import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { User } from '../../model/user';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [NgIf],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent implements OnInit {


  user: User | undefined | null;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.authService.getCurrentUser().subscribe({
      next: value => {
        console.log(value);
        this.user = value;
      },
      error: err => {
        console.log(err);
      },
    })
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
