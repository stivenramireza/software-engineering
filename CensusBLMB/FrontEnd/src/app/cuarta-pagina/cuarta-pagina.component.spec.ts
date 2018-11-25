import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuartaPaginaComponent } from './cuarta-pagina.component';

describe('CuartaPaginaComponent', () => {
  let component: CuartaPaginaComponent;
  let fixture: ComponentFixture<CuartaPaginaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuartaPaginaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuartaPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
