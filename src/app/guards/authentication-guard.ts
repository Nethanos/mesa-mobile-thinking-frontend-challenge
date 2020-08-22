import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageManager } from '../middlewares/local-storage-manager';


@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private localStorageManagar: LocalStorageManager, private router: Router) { }

    canActivate(): any {
        return this.isAuthenticated() ? true : this.redirectToSignIn();
    }

    redirectToSignIn() {
        this.router.navigate(['']);
    }

    isAuthenticated(): boolean {
        console.log(!!this.localStorageManagar.getUserToken());
        return !!this.localStorageManagar.getUserToken();
    }
}