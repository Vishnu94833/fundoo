import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpService } from 'src/app/core/services/http/http.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [{provides: HttpService, useClass: HttpService}]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form should be valid', async(()=>{
    expect(component.model.email).toEqual("abc@gmail.com")
    expect(component.model.password).toEqual("aa")
    expect(component.model.password).toEqual("aaaaaaaa")
    expect(component.model.password).toEqual("A@aaaaaa")
    expect(component.email).toBeTruthy();
  }))
  
});
