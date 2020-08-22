import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Place } from '../../model/place';
import { PlaceUserEvaluation } from '../../model/place-user-evaluation';
import { LocalStorageManager } from '../../middlewares/local-storage-manager';

@Component({
  selector: 'app-place-section',
  templateUrl: './place-section.component.html',
  styleUrls: ['./place-section.component.scss']
})
export class PlaceSectionComponent implements OnInit, AfterViewInit {

  constructor(private localStorageManager: LocalStorageManager) { }


  placeEvaluationList: Array<PlaceUserEvaluation>;


  ngOnInit(): void {
    this.placeEvaluationList = this.getPlaceEvaluationList();

  }

  isFavoritePlace(): boolean {
    return this.localStorageManager.isPlaceFavorite(this.place);
  }

  getPlaceEvaluationList() {
    const placeEvaluationList = this.localStorageManager.getEvaluationList()
      .filter(evaluation => evaluation.placeId === this.place.place_id);


    return placeEvaluationList;
  }

  newPlaceUserEvaluation = {} as PlaceUserEvaluation;


  ngAfterViewInit(): void {
    const elem = document.getElementById(this.generateModalIdentifier());
    M.Modal.init(elem);
  }

  isCommentFieldEnabled: boolean;

  modalIdentifier = Math.round(Math.random()).toString();

  @Input() place: Place

  enableCommentModal() {
    const elem = document.getElementById(this.generateModalIdentifier());
    M.Modal.getInstance(elem).open();
  }


  registerRatingVote(event: any) {
    this.newPlaceUserEvaluation.rating = event;

  }

  generateModalIdentifier() {
    const normalizedPlaceName = this.place.name.trim().replace(/\s/g, "-");
    return normalizedPlaceName.toLocaleLowerCase().concat("-comment-modal");
  }

  finishCommentary() {
    this.newPlaceUserEvaluation.user = this.localStorageManager.getUser();
    this.newPlaceUserEvaluation.placeId = this.place.place_id;


    this.placeEvaluationList.push(this.newPlaceUserEvaluation);
    this.localStorageManager.registryUserEvaluation(this.newPlaceUserEvaluation);

    const elem = document.getElementById(this.generateModalIdentifier());

    M.Modal.getInstance(elem).close();

  }

  favoritePlace() {
    this.localStorageManager.favoritePlace(this.place);
  }

  getFavoriteIcon() {
    return this.isFavoritePlace() ? 'favorite' : 'favorite_border'
  }

  handleFavoriteAction() {
    this.isFavoritePlace() ? this.unfavoritePlace() : this.favoritePlace();
  }

  unfavoritePlace() {
    this.localStorageManager.unfavoritePlace(this.place);
  }
}
