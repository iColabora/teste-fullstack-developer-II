import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarFormularioComponent } from './criar-formulario.component';

describe('CriarFormularioComponent', () => {
  let component: CriarFormularioComponent;
  let fixture: ComponentFixture<CriarFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarFormularioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
