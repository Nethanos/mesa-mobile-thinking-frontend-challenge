import { Component, OnInit, Input } from '@angular/core';
import { PlaceUserEvaluation } from '../../model/place-user-evaluation';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {

  @Input() placeUserEvaluation: PlaceUserEvaluation;

  constructor() { }

  ngOnInit(): void {
    console.log(this.placeUserEvaluation);
  }


}
