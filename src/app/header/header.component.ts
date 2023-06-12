import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  collapsed = true
  isAuthenticated = false
  private userSub?: Subscription
  role? : String

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = user == null ? false : true
      this.role = user?.roles
    })
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe()
  }

  onLogout() {
    this.authService.logout()
  }
}
