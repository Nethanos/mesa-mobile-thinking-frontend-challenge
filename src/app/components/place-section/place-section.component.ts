import { Component, OnInit, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { Place } from '../../model/place';
import { PlaceUserEvaluation } from '../../model/place-user-evaluation';
import { LocalStorageManager } from '../../middlewares/local-storage-manager';

@Component({
  selector: 'app-place-section',
  templateUrl: './place-section.component.html',
  styleUrls: ['./place-section.component.scss']
})
export class PlaceSectionComponent implements OnInit, AfterContentInit {

  constructor(private localStorageManager: LocalStorageManager) { }

  @Input() place: Place

  placeEvaluationList: Array<PlaceUserEvaluation>;

  commentModalIdentifier: string;

  commentModal: M.Modal;

  newPlaceUserEvaluation = {} as PlaceUserEvaluation;

  isCommentFieldEnabled: boolean;


  ngOnInit(): void {
    this.placeEvaluationList = this.getPlaceEvaluationList();

  }

  ngAfterContentInit(): void {
    this.loadCommentModal();
  }

  loadCommentModal(): M.Modal {
    this.commentModalIdentifier = this.generateCommentModalIdentifier()
    const elem = document.getElementById(this.commentModalIdentifier);
    this.commentModal = M.Modal.init(elem);
    return this.commentModal;
  }

  private _getCommentModal(): M.Modal {
    if (this.commentModal) {
      return this.commentModal;
    }
    return this.loadCommentModal();
  }

  isFavoritePlace(): boolean {
    return this.localStorageManager.isPlaceFavorite(this.place);
  }

  getPlaceEvaluationList() {
    const placeEvaluationList = this.localStorageManager.getEvaluationList()
      .filter(evaluation => evaluation.placeId === this.place.place_id);


    return placeEvaluationList;
  }

  enableCommentModal(): void {
    this._getCommentModal().open();
  }


  registerRatingVote(event: any): void {
    this.newPlaceUserEvaluation.rating = event;

  }

  generateCommentModalIdentifier() {
    const normalizedPlaceName = this.place.name.trim().replace(/\s/g, "-");
    return normalizedPlaceName.toLocaleLowerCase().concat("-comment-modal");
  }

  finishCommentary() {
    this.newPlaceUserEvaluation.user = this.localStorageManager.getUser();
    this.newPlaceUserEvaluation.placeId = this.place.place_id;
    this.placeEvaluationList.push(this.newPlaceUserEvaluation);
    this.localStorageManager.registryUserEvaluation(this.newPlaceUserEvaluation);

    this._getCommentModal().close();

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
