import { Component, OnInit } from '@angular/core';
import { trigger,state,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { FormControl,Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations:[
    trigger('animationOption1', [
      state('start', style({
        backgroundColor: 'yellow',
        width: '150px',
        height: '150px'
      })),
      state('end', style({
        backgroundColor: 'green',
        width: '300px',
        height: '300px'
      })),
      transition('start => end', animate(1500)),
      transition('end => start', animate('800ms 0.5s ease-out'))
    ])
  ]
})   
 
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorEmail() {
    return this.email.hasError('required') ? 'Enter a Valid email  ' :
        this.email.hasError('email') ? 'Invalid email' :
            '';
  }
  isLeftVisible:any;
  register()
  {
    if(!this.email.invalid)
    {
      this.isLeftVisible = !this.isLeftVisible;
    }
    else
    {
      alert('enter email address');
    }
  }
  constructor() { }
hide = true;
  
    ngOnInit() {

    }

}
