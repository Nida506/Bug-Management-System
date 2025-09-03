import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../services/user/user';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  loggedInUser: any | null = null;
  constructor(private user_service: User) {}
  ngOnInit() {
    this.loggedInUser = this.user_service.loggedInUserInfo$.pipe(
      (user: any) => {
        if (user) return user;
      }
    );
  }
  onLogout() {
    this.user_service.userLogout();
  }
}
