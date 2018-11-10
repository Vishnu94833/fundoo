import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabeldeleteComponent } from './labeldelete.component';

describe('LabeldeleteComponent', () => {
  let component: LabeldeleteComponent;
  let fixture: ComponentFixture<LabeldeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabeldeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabeldeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
