import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('sign up form should be valid', async(()=>{
    expect(component.model.firstname).toEqual("aastha")
    expect(component.model.lastname).toEqual("gupta")
    expect(component.model.firstname).toEqual("Aastha")
    expect(component.model.lastname).toEqual("Gupta")
    expect(component.model.email).toEqual("aastha@xyz.com")
    expect(component.model.password).toEqual("aa")
    expect(component.model.password).toEqual("A@aaaaaa")
    expect(component.model.service).toEqual("basic")
    expect(component.model.service).toEqual("advance")
    expect(component.model.phonenumber).toEqual("9999922222")
    expect(component.model).toBeTruthy();
  }))
  it('sign up form should not be valid', async(()=>{
    expect(component.model.firstname).toEqual("1234aaaa")
    expect(component.model.lastname).toEqual("xyz251")
    expect(component.model.firstname).toEqual("AA1234")
    expect(component.model.lastname).toEqual("Gupta1234#$$E")
    expect(component.model.email).toEqual("aastha&xyz.com")
    expect(component.model.password).toEqual("a")
    expect(component.model.password).toEqual("Aaaaaaaaaa")
    expect(component.model).toBeFalsy();
  }))
}); 
