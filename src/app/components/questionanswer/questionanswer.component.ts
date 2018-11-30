import { Component, OnInit, OnDestroy } from '@angular/core';
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
  private noteDetails = this.url.split('/');
  private id = localStorage.getItem('userId')
  private image = localStorage.getItem('imageUrl');
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
    this.getDetails();
    // this.questionAnswerReply(this.reply,);
    console.log(this.id)
    console.log(this.url)
  }

repliedFunc(){
  this.replied = 1;
}

repliedNotFunc(){
  this.replied = 0;
}

  likedNote(parentId) {
    this.liked = 0;
    // let parentId = this.questionArray['questionAndAnswerNotes'][0].id
    this.questionService.likeToQuestion(parentId,
      {
        "like": true
      }
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.liked=1;
          let count = data['data']['details'].count;
          console.log('liked is successful', data);
        },
        error => {
          console.log("Error", error);
        });

  }

  /**
   * @description Function to get particular note details for question and answer purpose
   */
  getDetails() {
    this.notesService.getNotesDetail(this.noteDetails[3])
      .pipe(takeUntil(this.destroy$)).subscribe(
        (data) => {
          console.log('data', data);
          this.questionArray = data['data']['data'][0]
          this.questionName = data['data']['data'][0]['questionAndAnswerNotes']
          console.log(this.questionName)
          this.title = this.questionArray.title;
          this.description = data['data']['data'][0].description
          this.messageArray = this.questionArray['questionAndAnswerNotes']
          // this.userArray = this.questionArray['questionAndAnswerNotes'][0]
            this.userName=this.messageArray[0]
          console.log(this.userName)
          console.log(this.messageArray);
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

          console.log('data', data);
        },
        error => {
          console.log("Error", error);
        });
  }


  questionAnswerReply(reply) {
    let parentId = this.questionArray['questionAndAnswerNotes'][0].id
    this.questionService.replyToQuestion(
      {
        "message": reply
      }, parentId
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.replyMessage = data['data']['data']['questionAndAnswerNotes']
        console.log('data', data);
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
          console.log('rating is successful', data);
        },
        error => {
          console.log("Error", error);
        });
  }


  getQuestionNotes() {
    // console.log(this.id)
    this.questionService.questionAndAnswerNotes(this.noteDetails[3])
      .pipe(takeUntil(this.destroy$)).subscribe(
        (data) => {
          console.log('data', data);
        },
        error => {
          console.log("Error", error);
        });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
