import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcollaboratorComponent } from './addcollaborator.component';

describe('AddcollaboratorComponent', () => {
  let component: AddcollaboratorComponent;
  let fixture: ComponentFixture<AddcollaboratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcollaboratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('form should be valid', async(()=>{
  //   expect(component.email).toEqual("abc@gmail.com")
  //   expect(component.model.password).toEqual("aa")
  //   expect(component.model.password).toEqual("aaaaaaaa")
  //   expect(component.model.password).toEqual("A@aaaaaa")
  //   expect(component.email).toBeTruthy();
  // }))
});
