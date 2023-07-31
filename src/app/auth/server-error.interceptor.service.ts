import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class ServerErrorInterceptor implements HttpInterceptor {
    
    constructor(private authService: AuthService, 
        private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe( 
            tap(() => {}, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status !== 401) {
                        return;
                    }
                    alert('Another instance is logged in using this account!')
                    this.authService.logout();
                }
            })
        );
    };
    
}