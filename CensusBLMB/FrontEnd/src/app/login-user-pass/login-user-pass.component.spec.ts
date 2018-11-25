import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUserPassComponent } from './login-user-pass.component';

describe('LoginUserPassComponent', () => {
  let component: LoginUserPassComponent;
  let fixture: ComponentFixture<LoginUserPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginUserPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginUserPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
