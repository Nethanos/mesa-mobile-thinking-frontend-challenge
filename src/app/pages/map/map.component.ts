import { Component, OnInit, ViewChild } from '@angular/core';
import { AgmMap } from '@agm/core';
import { Place } from '../../model/place';

interface PlaceData {
  description: string,
  lat: number,
  lng: number,
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  @ViewChild('map') map: AgmMap

  googleMap: google.maps.Map;

  nearbyPlaceList: Array<Place>

  googleMapsService: google.maps.places.PlacesService

  constructor() { }


  lat: number = -23.8779431;
  lng: number = -49.8046873;
  zoom: number = 16;

  mapLoaded(event): void {

    this.googleMap = event;
    this.googleMapsService = new google.maps.places.PlacesService(this.googleMap);

    this.getUserCoords();
  }


  getUserCoords(): void {

    navigator.geolocation.getCurrentPosition((response) => {

      const { latitude, longitude } = response.coords;

      this.applyLatitudeAndLongitudeToMapView(latitude, longitude);

      const userCurrentLocation = this.getUserCurrentPlace(latitude, longitude);

      const nearbySearchParamRequest = this.createUserNearbyPlaceRequestParam(userCurrentLocation);

      this.findUserNearbyPlaces(nearbySearchParamRequest);
    })
  }

  createUserNearbyPlaceRequestParam(userCurrentLocation: google.maps.LatLng): any {
    return {
      radius: 200,
      location: userCurrentLocation,
    }
  }

  findUserNearbyPlaces(requestParam): void {
    this.googleMapsService.nearbySearch(requestParam, this.showNearbyPlaces.bind(this))

  }

  applyLatitudeAndLongitudeToMapView(lat, lng): void {
    this.lat = lat;
    this.lng = lng;
  }

  getUserCurrentPlace(lat, lng): google.maps.LatLng {
    return new google.maps.LatLng(lat, lng);
  }

  showNearbyPlaces(resultList: Array<any>, status): void {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      this.nearbyPlaceList = resultList;
    }

  }

}
