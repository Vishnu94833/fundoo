import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionanswerComponent } from './questionanswer.component';

describe('QuestionanswerComponent', () => {
  let component: QuestionanswerComponent;
  let fixture: ComponentFixture<QuestionanswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionanswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionanswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
