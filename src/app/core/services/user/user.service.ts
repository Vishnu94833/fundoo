import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpservice:HttpService) { }

  login(body){
    return this.httpservice.signUpAndLoginPost('/user/login',body)
  }
  registerPushToken(body) {
    return this.httpservice.postDataJsonType('/user/registerPushToken',body)
  }
  newPassword(body){
    return this.httpservice.signUpAndLoginPost('/user/reset',body)
  }
  resetPassword(body){
    return this.httpservice.postReset("/user/reset-password",body)
  }
  userSignUp(body){
    return this.httpservice.signUpAndLoginPost('/user/userSignUp',body)
  }
  getServiceOfUser(){
    return this.httpservice.getConfig('/user/service')
  }
  logoutPost({}){
    return this.httpservice.logoutPost('/user/logout',{})
  }

}
