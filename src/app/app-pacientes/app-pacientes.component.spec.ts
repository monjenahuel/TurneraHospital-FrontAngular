import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPacientesComponent } from './app-pacientes.component';

describe('AppPacientesComponent', () => {
  let component: AppPacientesComponent;
  let fixture: ComponentFixture<AppPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppPacientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
