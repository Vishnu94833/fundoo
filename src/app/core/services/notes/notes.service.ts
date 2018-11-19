import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {



  constructor(private myRoute: Router, private httpservice: HttpService,) { }
  
  addnotes(body){
    console.log(body);
    
    return this.httpservice.postdata('/notes/addNotes',body);
  }

  // addLabels(body){
  //   console.log(body);
    
  //   return this.httpservice.postdata('noteLabels',body);
  // }

}
