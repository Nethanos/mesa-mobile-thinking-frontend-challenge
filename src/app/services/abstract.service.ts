import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractService {

  constructor(private http: HttpClient, public resourceEndpoint: string) {
    this._API_RESOURCE_ENDPOINT = resourceEndpoint;
    this._API_URL += this._API_RESOURCE_ENDPOINT;
  }


  private _API_URL = 'https://reqres.in/api/'

  private _API_RESOURCE_ENDPOINT;


  getRequestHeaders() {
    const token = localStorage.getItem("token");
    return { token };
  }


  getRequestOptions() {
    return { headers: this.getRequestHeaders() }
  }

  retrieve(id: string): Observable<any> {

    return this.http.get(`${this._API_URL}/${id}`, this.getRequestOptions())
  }

  update(resource: any) {
    return this.http.put<any>(`${this._API_URL}/${resource.id}`, resource, this.getRequestOptions())
  }

}
