import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnotesComponent } from './addnotes.component';
import { element } from '@angular/core/src/render3/instructions';

describe('AddnotesComponent', () => {
  let component: AddnotesComponent;
  let fixture: ComponentFixture<AddnotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form should be valid', async(()=>{
   
  }))
});
