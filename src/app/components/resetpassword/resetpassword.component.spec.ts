import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpasswordComponent } from './resetpassword.component';

describe('ResetpasswordComponent', () => {
  let component: ResetpasswordComponent;
  let fixture: ComponentFixture<ResetpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('reset password form should be valid', async(()=>{
    expect(component.password).toEqual("aaaaaaaa") 
    expect(component.password).toEqual("A@aaaaaa")
    expect(component.password).toBeTruthy();
  }))

  it('reset password form should be valid', async(()=>{
    expect(component.password).toEqual("a") 
    expect(component.password).toEqual("Aaaaaaa")
    expect(component.password).toBeFalsy();
  }))

});
