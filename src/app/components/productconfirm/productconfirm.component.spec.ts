import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductconfirmComponent } from './productconfirm.component';

describe('ProductconfirmComponent', () => {
  let component: ProductconfirmComponent;
  let fixture: ComponentFixture<ProductconfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductconfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
