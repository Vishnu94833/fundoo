import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-collectionnotes',
  templateUrl: './collectionnotes.component.html',
  styleUrls: ['./collectionnotes.component.css']
})
export class CollectionnotesComponent implements OnInit {


  constructor() { }
  
  @Input() cardadded;
  @Output() addnotes= new EventEmitter();


  ngOnInit() {
     
  }
  new(event)
  {
this.addnotes.emit({})
  }
}
