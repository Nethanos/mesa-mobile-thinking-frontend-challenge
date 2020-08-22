import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';
import { MapComponent } from './map.component';
import { RatingComponent } from '../../components/rating/rating.component';
import { PlaceSectionComponent } from '../../components/place-section/place-section.component';
import { CommentSectionComponent } from '../../components/comment-section/comment-section.component';
import { environment } from '../../../environments/environment';
import { MapRoutingModule } from './map-routing.module';
import { SharedModule } from '../../shared/shared.module';


const Components = [MapComponent, RatingComponent, PlaceSectionComponent, CommentSectionComponent]
@NgModule({
    declarations: Components,
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        MapRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: environment.placesApi
        }),

    ],
    exports: Components
})
export class MapModule { }
