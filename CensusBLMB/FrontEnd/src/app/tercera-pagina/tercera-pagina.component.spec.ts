import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerceraPaginaComponent } from './tercera-pagina.component';

describe('TerceraPaginaComponent', () => {
  let component: TerceraPaginaComponent;
  let fixture: ComponentFixture<TerceraPaginaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerceraPaginaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerceraPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
