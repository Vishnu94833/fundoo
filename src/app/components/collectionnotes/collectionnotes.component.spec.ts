import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionnotesComponent } from './collectionnotes.component';

describe('CollectionnotesComponent', () => {
  let component: CollectionnotesComponent;
  let fixture: ComponentFixture<CollectionnotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionnotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionnotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
