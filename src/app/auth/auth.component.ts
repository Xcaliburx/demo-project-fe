import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = false
  isLoading = false

  constructor(
    private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute) {}
    private subs?: Subscription

  ngOnInit(): void {
    let state = this.route.snapshot.queryParams['state']
    this.setMode(state)
    this.subs = this.route.queryParams
      .subscribe(
        (params) => {
          this.setMode(params['state'])
        }
      )
  }
  
  private setMode(state: string) {
    if (state == 'login') {
      this.isLoginMode = true
    } else if (state == 'register') {
      this.isLoginMode = false
    }
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return
    }
    const email = form.value.email
    const password = form.value.password
    const role = form.value.role

    this.isLoading = true
    if (this.isLoginMode) {
      this.authService.login(email, password)
        .subscribe(resData => {
          this.isLoading = false
          if (resData.roles == 'Broker') {
            this.router.navigate(['/brokers'])
          } else {
            this.router.navigate(['/developers'])
          }
        }, errorMessage => {
          this.isLoading = false
          console.log(errorMessage)
        })
    } else {
      this.authService.register(email, password, role)
        .subscribe(resData => {
          this.isLoading = false
          this.router.navigate(['/auth'], {queryParams: {state: 'login'}})
        }, errorMessage => {
          this.isLoading = false
          console.log(errorMessage)
        })
    }
    form.reset()
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe()
  }
}
