import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {

  private token=localStorage.getItem('token');
@Input() pinArr;
@Output() pinEmit = new EventEmitter();

  constructor(private httpservice:HttpService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    // this.pinned(id)
  }

pinned()
{
  this.httpservice.postarchive('notes/pinUnpinNotes',
      {
        "isPined": true,
        "noteIdList":[this.pinArr.id]
      }, this.token).subscribe(
        (data) => {
          console.log("POST pin Request is successful ", data);
          this.snackBar.open("Note Pinned Successfully", "", {
            duration: 2000
          })
          this.pinEmit.emit();
        
        },
        error => {
          console.log("Error", error);
     
        })
}

unPinned()
{
  this.httpservice.postarchive('notes/pinUnpinNotes',
      {
        "isPined": false,
        "noteIdList":[this.pinArr.id]
      }, this.token).subscribe(
        (data) => {
          console.log("POST unpin Request is successful ", data);
          this.snackBar.open("Note UnPinned Successfully", "", {
            duration: 2000
          })

          this.pinEmit.emit();
        
        },
        error => {
          console.log("Error", error);
     
        })
}

}
