import { AuthService } from './auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take, zip } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DeveloperGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.user.pipe(
            take(1),
            map(user => {
                const isAuth = user != null
                if (isAuth) {
                    if (user.roles == 'Developer')
                        return true
                    else 
                        return this.router.createUrlTree(['/brokers'])
                }
                return this.router.createUrlTree(['/auth'])
            })
        )
    }
    
}