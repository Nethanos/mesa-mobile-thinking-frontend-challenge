import { User } from './user';

export interface PlaceUserEvaluation {
    user: User;
    rating: number;
    commentary: string;
    placeId: string;

}