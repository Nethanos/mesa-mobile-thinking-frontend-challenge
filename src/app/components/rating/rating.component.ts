import { Component, OnInit, Output, EventEmitter } from '@angular/core';



interface StarRating {
  starred: boolean
  ratingValue: number;
}


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  constructor() { }

  starRatingList = new Array<StarRating>();


  @Output() onVote = new EventEmitter<number>();

  ngOnInit(): void {
    this.initializeStarRatingArray();
  }

  initializeStarRatingArray(): void {
    for (let i = 1; i <= 5; i++) {
      this.starRatingList.push({ starred: false, ratingValue: i } as StarRating);
    }
  }

  displayStarStatus(star: StarRating) {
    return star.starred ? 'star_rate' : 'star_border';
  }


  votePlaceRate(starRating: StarRating): void {
    if (this.isStarVoted(starRating)) {
      this.handleVote(starRating);
    } else {
      this.handleUnvote(starRating);
    }

    this.onVote.emit(starRating.ratingValue);

  }

  isStarVoted(star: StarRating) {
    return !star.starred;
  }

  handleVote(star: StarRating) {
    star.starred = true;
    this.handleVoteOnInterface(star);

  }
  handleVoteOnInterface(star: StarRating) {
    for (let i = 0; i < star.ratingValue; i++) {
      this.starRatingList[i].starred = true;
    }
  }


  handleUnvote(star: StarRating) {
    star.starred = false;
    this.handleUnvoteOnInterface(star);
  }

  handleUnvoteOnInterface(star: StarRating) {
    for (let i = star.ratingValue - 1; i <= 4; i++) {
      this.starRatingList[i].starred = false;
    }
  }








}
