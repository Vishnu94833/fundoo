import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private myRoute:Router,private http: HttpClient) { }
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
// token = localStorage.getItem('token');
logoutPost(url,token)
{
  console.log(token);
  
  url = this.postUrl+url;
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    }) 
  };
  return this.http.post(url,{},httpOptions);
  // localStorage.removeItem("LoggedInUser");
    // this.myRoute.navigate(["login"]);
}
addnotes(url,body,token)
{
  console.log(token);
  
  url = this.postUrl+url;
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token
    }) 
  };
  return this.http.post(url,this.getFormUrlEncoded(body),httpOptions);

}
getnotes(url,token)
{
  console.log(token)

  url = this.postUrl+url;
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token
    }) 
  };
  return this.http.get(url,httpOptions);
}

}