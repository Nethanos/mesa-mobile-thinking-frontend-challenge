import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginInformation } from '../model/login-information';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    API_URL = 'https://reqres.in/api/users'


    retrieve(id: string): Observable<any> {
        return this.http.get<any>(`${this.API_URL}/${id}`);
    }


    update(user: User): Observable<any> {
        return this.http.put<any>(`${this.API_URL}/${user.id}`, user);
    }


}
