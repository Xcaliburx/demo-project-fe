import { catchError, Subject, tap, throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";

export interface AuthResponse {
    token: string,
    id: number,
    email: string,
    roles: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user = new BehaviorSubject<User | null>(null)

    constructor(private http: HttpClient, private router: Router) {}

    register(email: string, password: string, role: string) {
        return this.http.post<string>(
            "http://localhost:8080/auth/register",
            {
                email: email,
                password: password,
                role: role
            }
        ).pipe(
            catchError(this.handleError)
        )
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponse>(
            "http://localhost:8080/auth/login",
            {
                email: email,
                password: password
            }
        ).pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuth(
                    resData.email,
                    resData.id,
                    resData.token,
                    resData.roles
                )
            })
        )
    }

    autoLogin() {
        const userData: {
            _token: string,
            id: number,
            email: string,
            roles: string
        } = JSON.parse(localStorage.getItem('userData') || '{}')

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData.roles,
            userData._token
        )

        if (loadedUser.token) {
            this.user.next(loadedUser)
        }
    }

    private handleAuth(email: string, id: number, token: string, role: string) {
        const user = new User(
            email,
            id, 
            role,
            token
        )
        this.user.next(user)
        localStorage.setItem('userData', JSON.stringify(user))
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error message'
        if (!errorRes.message) {
            return throwError(() => new Error(errorMessage))
        }
        return throwError(() => new Error(errorMessage))
    }

    logout() {
        this.user.next(null)
        this.router.navigate(['/auth'])
        localStorage.removeItem('userData')
    }
}