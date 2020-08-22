
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PlaceUserEvaluation } from '../model/place-user-evaluation';
import { LocalStorageManager } from '../middlewares/local-storage-manager';


@Injectable({
    providedIn: 'root'
})
export class PlacesService {

    lat: string;
    lng: string;

    PLACES_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'

    constructor(private http: HttpClient) {
    }

    getNearbyPlaces(latitude: string, longitude: string) {
        this.lat = latitude;
        this.lng = longitude;
        const location = `${this.lat},${this.lng}`;
        // location=${this.lat},${this.lng}&radius=1500&key=${environment.placesApi}`

        this.http.get(this.PLACES_URL, {
            params: {
                location,
                radius: '1500',
                key: environment.placesApi
            }
        }).subscribe((response) => {
            console.log(response);
        })
    }
}