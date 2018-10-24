import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})
export class MoreComponent implements OnInit {

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
