import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ConnectionService {

    private _toasterConfig = {
        timeOut: 3000
    }

    /**
     * 
     * O ideal deste serviço seria criar um Observable desse um subscription
     * com um interval de valor X, quando tivesse offline, disparasse o next e o subscribe trataria.
     */
    constructor(private toasterService: ToastrService) { }

    checkConnection() {
        if (!navigator.onLine) {
            this.showNoConnectionAlert();
        }
    }


    showNoConnectionAlert() {
        this.toasterService.warning("It seems you don't have network connection.", "Connection Error!", this._toasterConfig);
    }

}