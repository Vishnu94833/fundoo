import { Component } from '@angular/core';
// import { MessagingService } from './core/services/messagingservice/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fundoo';
  isLeftVisible = true;
  // message;

  constructor() {
  }
  ngOnInit() {
    // const userId = 'user001';
    // this.messagingService.requestPermission(userId)
    // this.messagingService.receiveMessage()
    // this.message = this.messagingService.currentMessage

  }
}

