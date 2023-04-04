import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreencherFormularioComponent } from './preencher-formulario.component';

describe('PreencherFormularioComponent', () => {
  let component: PreencherFormularioComponent;
  let fixture: ComponentFixture<PreencherFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreencherFormularioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreencherFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
