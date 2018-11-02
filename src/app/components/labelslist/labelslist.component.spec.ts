import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelslistComponent } from './labelslist.component';

describe('LabelslistComponent', () => {
  let component: LabelslistComponent;
  let fixture: ComponentFixture<LabelslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
