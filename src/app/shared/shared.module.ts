import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../components/map/map.component';
import { environment } from '../../environments/environment';
import { AgmCoreModule } from '@agm/core';




@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: environment.placesApi
    }),
  ],
  exports: [MapComponent]
})
export class SharedModule { }
