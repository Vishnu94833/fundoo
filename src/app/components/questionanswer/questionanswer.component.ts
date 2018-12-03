import { Component, OnInit, OnDestroy ,ViewChild, ElementRef} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { NotesService } from 'src/app/core/services/notes/notes.service';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { Router } from '@angular/router';
import { QuestionanswerService } from 'src/app/core/services/questionanswer/questionanswer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-questionanswer',
  templateUrl: './questionanswer.component.html',
  styleUrls: ['./questionanswer.component.scss']
})
export class QuestionanswerComponent implements OnInit, OnDestroy {
  @ViewChild('reply') private replyDone: ElementRef;
  destroy$: Subject<boolean> = new Subject<boolean>();
  message: any;
  title: any;
  description: any;
  private userArray: any=[];
  constructor(private notesService: NotesService, private route: Router,
    private questionService: QuestionanswerService) { }
  private url = this.route.url;
  private question;
  private reply;
  private questionArray: any = []
  private questionCheckList: any = []
  private questionAnswer: any = []
  private messageArray: any = []
  private noteDetails;
  private id = localStorage.getItem('userId')
  private image = localStorage.getItem('imageUrl');
  private img = environment.apiUrl+this.image;
  private userImage = environment.apiUrl ;
  private email = localStorage.getItem('email');
  private replyMessage: any = [];
  private userName: any = [];
  private questionName: any = [];
  private liked = 0;
  private replied = 0;
  private parentId;
    private askQuestion;
  ngOnInit() {
    this.noteDetails = this.url.split('/');
    this.getDetails(this.noteDetails[3]);
    
  }

repliedFunc(){
  this.replied = 1;
}

repliedNotFunc(){
  this.replied = 0;
}

  likedNote(parentId,flag) {
    // this.liked = 0;
    // let parentId = this.questionArray['questionAndAnswerNotes'][0].id
    this.questionService.likeToQuestion(parentId,
      {
        "like": flag
      }
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          // this.liked=1;
          let count = data['data']['details'].count;
          console.log('liked is successful', data);
          this.getDetails(this.noteDetails[3])
        },
        error => {
          // console.log("Error", error);
        });

  }

  public lykC;
  likeDisplay(ques){
    this.lykC=0;
    for (let i = 0; i < ques.like.length;i++){
      if(ques.like[i].like==true){
        this.lykC=this.lykC+1;
      }
    }
    return true;
  }


  isliked(ques) {
    this.liked = 0;
    for (let i = 0; i < ques['like'].length; i++) {
      if (ques.like[i].userId == localStorage.getItem('userId') && ques.like[i].like == true) {
        this.liked = 1;
        return true;
      }
    }
    return true;

  }
  /**
   * @description Function to get particular note details for question and answer purpose
   */
  getDetails(noteData) {
    this.notesService.getNotesDetail(noteData)
      .pipe(takeUntil(this.destroy$)).subscribe(
        (data) => {
          this.messageArray=[];
console.log("note details api");

          this.questionArray = data['data']['data'][0]
          this.questionName = data['data']['data'][0]['questionAndAnswerNotes']
          this.title = this.questionArray.title;
          this.description = data['data']['data'][0].description
          this.messageArray = this.questionArray['questionAndAnswerNotes']
            this.userName=this.messageArray[0]
            console.log(data)
            console.log(this.userName.id)
          if (this.questionArray['questionAndAnswerNotes'][0] != undefined) {
            this.message = this.questionArray['questionAndAnswerNotes'][0].message;
            this.parentId = this.questionArray['questionAndAnswerNotes'][0].id;
          }
        },
        error => { 
          console.log("Error", error);
        });
  }

  /**
   * @description function to post the question 
   * @param question 
   */
  questionAnswerPost(question) {
    this.questionService.addQuestionAndAnswer(
      {
        "message": question,
        "notesId": this.noteDetails[3]
      }
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.questionAnswer = data['data']['details']
          this.getDetails(this.noteDetails[3])
          // console.log('data', data);
        },
        error => {
          // console.log("Error", error);
        });
  }


  questionAnswerReply(parentId) {
        // let parentId = this.questionArray['questionAndAnswerNotes'][0].id
    this.questionService.replyToQuestion(
      {
        "message": this.replyDone.nativeElement.innerHTML
      }, parentId
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.replied=0;
          console.log('data', data);
          this.getDetails(this.noteDetails[3])
        
        },
        error => {
          console.log("Error", error);
        });
  }


  questionAnswerRate(parentId,event) {
    // let parentId = this.questionArray['questionAndAnswerNotes'][0].id
    this.questionService.rateToQuestion(parentId,
      {
        "rate": event
      }
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.getDetails(this.noteDetails[3])
          // console.log('rating is successful', data);
        },
        error => {
          // console.log("Error", error);
        });
  }


  getQuestionNotes() {
    // console.log(this.id)
    this.questionService.questionAndAnswerNotes(this.noteDetails[3])
      .pipe(takeUntil(this.destroy$)).subscribe(
        (data) => {
          this.getDetails(this.noteDetails[3])
          // console.log('data', data);
        },
        error => {
          // console.log("Error", error);
        });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
