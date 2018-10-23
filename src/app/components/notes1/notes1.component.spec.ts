import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Notes1Component } from './notes1.component';

describe('Notes1Component', () => {
  let component: Notes1Component;
  let fixture: ComponentFixture<Notes1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Notes1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Notes1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
