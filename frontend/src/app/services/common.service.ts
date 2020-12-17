import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient) {}

  getData(url) {
    return this.http.get(environment.API_URL + url);
  }

  postData(url, data) {
    return this.http.post(environment.API_URL + url, data);
  }

  putData(url, data) {
    return this.http.put(environment.API_URL + url, data);
  }

  deleteData(url) {
    console.log(environment.API_URL + url);
    return this.http.delete(environment.API_URL + url);
  }
}
