import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../components/map/map.component';
import { environment } from '../../environments/environment';
import { AgmCoreModule } from '@agm/core';
import { NavbarComponent } from './../components/navbar/navbar.component';
import { RatingComponent } from './../components/rating/rating.component';
import { PlaceSectionComponent } from '../components/place-section/place-section.component';
import { CommentSectionComponent } from '../components/comment-section/comment-section.component';
import { FormsModule } from '@angular/forms';

const Components = [MapComponent, NavbarComponent, RatingComponent, PlaceSectionComponent, CommentSectionComponent]
@NgModule({
  declarations: Components,
  imports: [
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.placesApi
    }),
  ],
  exports: Components
})
export class SharedModule { }
