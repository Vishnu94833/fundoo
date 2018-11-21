import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = environment.baseUrl;

  constructor(private myRoute: Router, private http: HttpClient) { }


  getConfig(url) {
    return this.http.get(this.baseUrl + url);
  }

  signUpAndLoginPost(url, body) {
    return this.http.post(this.baseUrl + url, body);
  }

  postReset(url, body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post(this.baseUrl + url, body, httpOptions)
  }

  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }

  logoutPost(url, { }) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.baseUrl + url, {}, httpOptions);
  }

  /**
   * @description service to create notes from take a note
   * @param url 
   * @param body 
   */
  postDataEncodedtype(url, body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post(environment.baseUrl + url, this.getFormUrlEncoded(body), httpOptions);

  }

  /**
  * @description service to create,edit  notes,labels
  * @param url 
  * @param body 
  * @param token 
  */

  postDataJsonType(url, body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(environment.baseUrl + url, body, httpOptions);
  }

  /**
  * @description function to get labels List,
  * @param url 
  * @param token 
  */
  getDataEncodedType(url) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.get(environment.baseUrl + url, httpOptions);
  }

  deleteData(path) {
    return this.http.delete(environment.baseUrl + path);
  }

  getDataJsonType(url) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(environment.baseUrl + url, httpOptions);
  }

  addImage(url, body, token) {
    var httpOptions = {
      headers: new HttpHeaders({

        'Authorization': token
      })
    };
    return this.http.post(this.baseUrl + url, body, httpOptions)
  }

}
