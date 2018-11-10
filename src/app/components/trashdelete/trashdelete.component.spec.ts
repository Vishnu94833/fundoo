import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashdeleteComponent } from './trashdelete.component';

describe('TrashdeleteComponent', () => {
  let component: TrashdeleteComponent;
  let fixture: ComponentFixture<TrashdeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrashdeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
