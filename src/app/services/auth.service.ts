import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginInformation } from '../model/login-information';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { LocalStorageManager } from '../middlewares/local-storage-manager';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private localStorageManager: LocalStorageManager) { }

    API_URL = 'https://reqres.in/api'


    login(loginInformation: LoginInformation): Observable<any> {

        return this.http.post<any>(`${this.API_URL}/login`, loginInformation);
    }

    signUp(user: User): Observable<any> {

        return this.http.post<any>(`${this.API_URL}/register`, user);
    }

    logout(): void {
        this.localStorageManager.handleLogoutAction();
    }


}
