import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  configUrl = 'http://34.213.106.173/api/user/service';
  postUrl='http://34.213.106.173/api/';

getConfig() {
  return this.http.get(this.configUrl);
}
addConfig(url,body)
{
  url = this.postUrl+url;
  return this.http.post(url,body);
}
postPassword(url,body)
{
  url = this.postUrl+url;
  return this.http.post(url,body);
}
}