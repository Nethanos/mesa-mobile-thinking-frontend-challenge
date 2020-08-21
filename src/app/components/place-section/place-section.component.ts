import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Place } from '../../model/place';

@Component({
  selector: 'app-place-section',
  templateUrl: './place-section.component.html',
  styleUrls: ['./place-section.component.scss']
})
export class PlaceSectionComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    const elem = document.getElementById(this.generateModalIdentifier());
    M.Modal.init(elem);
  }

  isCommentFieldEnabled: boolean;

  modalIdentifier = Math.round(Math.random()).toString();

  @Input() place: Place

  enableCommentModal() {
    const elem = document.getElementById(this.generateModalIdentifier());
    console.log(elem);
    M.Modal.getInstance(elem).open();
  }

  isTextFinalized(event) {
    if (event.charCode === 13) {
      console.log("Finalizei o texto");
    }
  }


  generateModalIdentifier() {
    const normalizedPlaceName = this.place.name.trim().replace(/\s/g, "-");
    return normalizedPlaceName.toLocaleLowerCase().concat("-comment-modal");
  }

}
