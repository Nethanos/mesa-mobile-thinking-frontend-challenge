import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginInformation } from '../model/login-information';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { AbstractService } from './abstract.service';
@Injectable({
    providedIn: 'root'
})
export class UserService extends AbstractService {

    constructor(http: HttpClient) {
        super(http, 'users');
    }

}
