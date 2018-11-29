import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionanswerService {

  constructor(private httpservice:HttpService) { }

  addQuestionAndAnswer(body){
    return this.httpservice.postDataJsonType("/questionAndAnswerNotes/addQuestionAndAnswer",body)
  }

  questionAndAnswerNotes(id){
    return this.httpservice.getDataJsonType("/questionAndAnswerNotes/"+id+"/user/questionAndAnswerNotes/count")

  }

  replyToQuestion(body,id){
    return this.httpservice.postDataJsonType("/questionAndAnswerNotes/reply/"+id,body)

  }

  rateToQuestion(parentId,body){
    return this.httpservice.postDataJsonType("/questionAndAnswerNotes/rate/"+parentId,body)
  }

  likeToQuestion(parentId,body){
    return this.httpservice.postDataJsonType("/questionAndAnswerNotes/like/"+parentId,body)
  }

}
