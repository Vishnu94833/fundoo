import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-collectionnotes',
  templateUrl: './collectionnotes.component.html',
  styleUrls: ['./collectionnotes.component.css']
})
export class CollectionnotesComponent implements OnInit {


  constructor() { }
  
  @Input() cardadded;


  ngOnInit() {
     
  }
}
