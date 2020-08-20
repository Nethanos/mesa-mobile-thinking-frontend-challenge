import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../components/map/map.component';
import { environment } from '../../environments/environment';
import { AgmCoreModule } from '@agm/core';
import { NavbarComponent } from './../components/navbar/navbar.component';
import { RatingComponent } from './../components/rating/rating.component';





@NgModule({
  declarations: [MapComponent, NavbarComponent, RatingComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: environment.placesApi
    }),
  ],
  exports: [MapComponent, NavbarComponent]
})
export class SharedModule { }
