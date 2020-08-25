import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ConnectionService } from '../services/connection.service';
import { LocalStorageManager } from '../middlewares/local-storage-manager';


@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private localStorageManagar: LocalStorageManager, private router: Router,
        private connectionService: ConnectionService) { }

    canActivate(): any {
        this.connectionService.checkConnection();
        return this.isAuthenticated() ? true : this.redirectToSignIn();
    }

    redirectToSignIn() {
        this.router.navigate(['']);
    }

    isAuthenticated(): boolean {
        return !!this.localStorageManagar.getUserToken();
    }
}