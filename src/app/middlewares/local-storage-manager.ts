import { Injectable } from '@angular/core';
import { PlaceUserEvaluation } from '../model/place-user-evaluation';
import { User } from '../model/user';
import { Place } from '../model/place';


interface FavoriteUserPlaceList {
    userId: string
    placeList: Array<Place>
}

@Injectable({
    providedIn: 'root'
})
export class LocalStorageManager {

    constructor() { }

    private _userEvaluationList: Array<PlaceUserEvaluation>;

    private _USER_EVALUATION_LIST_KEY = 'userEvaluationListKey';

    private _USER_TOKEN_KEY = "token";

    private _USER_KEY = "user";
    private _FAVORITE_PLACE_LIST_KEY = "favoritePlaceListKey"


    getUserToken(): string {
        return localStorage.getItem(this._USER_TOKEN_KEY);
    }

    saveUserToken(token: string): void {
        localStorage.setItem(this._USER_TOKEN_KEY, token);
    }

    saveUser(user: User) {
        localStorage.setItem(this._USER_KEY, JSON.stringify(user));
    }

    registryUserEvaluation(placeUserEvaluation: PlaceUserEvaluation): void {
        this._userEvaluationList = this.getEvaluationList();

        this._userEvaluationList.push(placeUserEvaluation);

        this.updateUserEvaluationList();
    }

    getEvaluationList(): Array<PlaceUserEvaluation> {
        this._userEvaluationList = JSON.parse(localStorage.getItem(this._USER_EVALUATION_LIST_KEY));
        if (this._userEvaluationList) {
            return this._userEvaluationList;
        }
        return this.createUserEvaluationList();
    }


    getFavoriteUserList(userId: string): FavoriteUserPlaceList {
        const allUserFavoritePlaceList: Array<FavoriteUserPlaceList> = this.getAllUserFavoriteList();

        const userFavoriteList = allUserFavoritePlaceList.filter(elem => elem.userId === userId);

        if (userFavoriteList.length > 1) {
            return userFavoriteList[0];
        }

        userFavoriteList.push({
            userId: userId,
            placeList: []
        });

        return userFavoriteList[0];
    }

    getAllUserFavoriteList(): Array<FavoriteUserPlaceList> {
        return JSON.parse(localStorage.getItem(this._FAVORITE_PLACE_LIST_KEY)) || this.createAllUserFavoritePlaceList();
    }

    createAllUserFavoritePlaceList(): Array<FavoriteUserPlaceList> {
        const allUserfavoritePlaceList = [] as Array<FavoriteUserPlaceList>;
        localStorage.setItem(this._FAVORITE_PLACE_LIST_KEY, JSON.stringify(allUserfavoritePlaceList));

        return allUserfavoritePlaceList;

    }

    favoritePlace(place: Place) {
        const userId = this.getUser().id;

        const favoriteUserPlaceList = this._setPlaceToFavorites(place, userId);

        const allUserFavoriteList = this._cleanAndGetFavoritePlaceList(userId);

        allUserFavoriteList.push(favoriteUserPlaceList);

        localStorage.setItem(this._FAVORITE_PLACE_LIST_KEY, JSON.stringify(allUserFavoriteList));
    }

    unfavoritePlace(placeToBeUnfavorited: Place) {
        const userId = this.getUser().id;

        const favoriteUserList = this.getFavoriteUserList(userId);

        const updatedFavoriteUserList = favoriteUserList.placeList
            .filter(place => place.place_id !== placeToBeUnfavorited.place_id);

        favoriteUserList.placeList = updatedFavoriteUserList;

        const allUserFavoriteList = this._cleanAndGetFavoritePlaceList(userId);

        allUserFavoriteList.push(favoriteUserList);

        localStorage.setItem(this._FAVORITE_PLACE_LIST_KEY, JSON.stringify(allUserFavoriteList));

    }

    createUserEvaluationList(): Array<PlaceUserEvaluation> {
        this._userEvaluationList = new Array<PlaceUserEvaluation>();
        localStorage.setItem(this._USER_EVALUATION_LIST_KEY, JSON.stringify(this._userEvaluationList));

        return this._userEvaluationList;
    }

    updateUserEvaluationList() {
        localStorage.setItem(this._USER_EVALUATION_LIST_KEY, JSON.stringify(this._userEvaluationList));
    }


    getUser(): User {
        return JSON.parse(localStorage.getItem(this._USER_KEY));
    }

    isPlaceFavorite(placeToBeChecked: Place) {
        const favoritePlaceUser = this.getFavoriteUserList(this.getUser().id);

        return favoritePlaceUser.placeList.some(place => place.place_id === placeToBeChecked.place_id);
    }

    private _setPlaceToFavorites(place: Place, userId: string): FavoriteUserPlaceList {
        const favoriteUserPlaceList: FavoriteUserPlaceList = this.getFavoriteUserList(userId);

        favoriteUserPlaceList.placeList.push(place);

        return favoriteUserPlaceList;
    }

    private _cleanAndGetFavoritePlaceList(userId: string): Array<FavoriteUserPlaceList> {
        return this.getAllUserFavoriteList()
            .filter(allUserFavoritePlace => allUserFavoritePlace.userId !== userId);
    }


}
