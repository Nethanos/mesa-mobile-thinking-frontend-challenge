import { Component, OnInit, ViewChild } from '@angular/core';
import { AgmMap } from '@agm/core';
import { Place } from './../../model/place';

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
export class MapComponent implements OnInit {

  @ViewChild('map') map: AgmMap

  googleMap: google.maps.Map;

  nearbyPlaceList: Array<Place>

  constructor() { }


  lat: number = -23.8779431;
  lng: number = -49.8046873;
  zoom: number = 16;

  ngOnInit() {

  }


  mapLoaded(event) {

    this.googleMap = event;

    const service = new google.maps.places.PlacesService(this.googleMap);

    navigator.geolocation.getCurrentPosition((response) => {

      const { latitude, longitude } = response.coords;

      this.lat = latitude;

      this.lng = longitude;

      const myPlace = new google.maps.LatLng(latitude, longitude);

      const request = {
        location: myPlace,
        radius: 200
      }

      service.nearbySearch(request, this.showNearbyPlaces.bind(this))

    })

  }

  showNearbyPlaces(resultList: Array<any>, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      this.nearbyPlaceList = resultList;
    }

  }

}
