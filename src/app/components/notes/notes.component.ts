import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  public open:boolean=true;
  constructor() { }

  ngOnInit() {
  }
  function()
  {
    this.open = !this.open;
  }
  close()
  {
    this.open = !this.open;
  }
}
