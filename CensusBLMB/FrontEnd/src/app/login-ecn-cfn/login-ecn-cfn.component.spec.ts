import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEcnCfnComponent } from './login-ecn-cfn.component';

describe('LoginEcnCfnComponent', () => {
  let component: LoginEcnCfnComponent;
  let fixture: ComponentFixture<LoginEcnCfnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginEcnCfnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginEcnCfnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
