import { catchError, Subject, tap, throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";

export interface AuthResponse {
    token: string,
    id: number,
    email: string,
    roles: string,
    expiredDate: number,
    sessionId: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user = new BehaviorSubject<User | null>(null)
    private tokenExpirationTimer: any

    constructor(private http: HttpClient, private router: Router) {}

    register(email: string, password: string, role: string) {
        return this.http.post<string>(
            "http://localhost:8085/auth/register",
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
            "http://localhost:8085/auth/login",
            {
                email: email,
                password: password
            }
        ).pipe(
            catchError(this.handleError),
            tap(resData => {
                console.log(resData)
                this.handleAuth(
                    resData.email,
                    resData.id,
                    resData.token,
                    resData.roles,
                    resData.expiredDate,
                    resData.sessionId
                )
            })
        )
    }

    autoLogin() {
        const userData: {
            _token: string,
            id: number,
            email: string,
            roles: string,
            expiredDate: number,
            sessionId: string
        } = JSON.parse(localStorage.getItem('userData') || '{}')

        if (new Date(userData.expiredDate).getTime() < new Date().getTime()) {
            this.logout()
            alert('Session expired')
        } else {
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
    }

    autoLogout (expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            console.log('expired')
            this.logout()
            alert('Session expired')
         }, expirationDuration)
     }

    private handleAuth(email: string, id: number, token: string, role: string, expiredDate: number, sessionId : string) {
        const user = new User(
            email,
            id, 
            role,
            token
        )
        this.user.next(user)
        const userData = {
            ...user,
            expiredDate: expiredDate,
            sessionId: sessionId
        }
        localStorage.setItem('userData', JSON.stringify(userData))
        console.log(new Date(expiredDate))
        console.log(new Date())
        console.log(new Date(expiredDate).getTime() -
        new Date().getTime())
        const expirationDuration = 
            new Date(expiredDate).getTime() -
            new Date().getTime()
        this.autoLogout(expirationDuration)
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error message'
        if (!errorRes.message) {
            return throwError(() => new Error(errorMessage))
        }
        return throwError(() => new Error(errorMessage))
    }

    logout() {
        const userData: {
            _token: string,
            id: number,
            email: string,
            roles: string,
            expiredDate: number,
            sessionId: string
        } = JSON.parse(localStorage.getItem('userData') || '{}')
        return this.http.post(
            "http://localhost:8085/auth/logout",
            userData.sessionId
        ).subscribe(data => {
            this.clearSession()
        })
    }

    clearSession() {
        this.user.next(null)
        this.router.navigate(['/auth'])
        localStorage.removeItem('userData')
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer = null
    }
}