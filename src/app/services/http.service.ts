import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
logPost(url,body)
{
  url = this.postUrl+url;
  return this.http.post(url,body);
}
postReset(name,input,access_token){
  console.log(input);
  console.log(access_token)
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': access_token
    })
  };
  return this.http.post(this.postUrl+"/"+name,this.getFormUrlEncoded(input),httpOptions)
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
}