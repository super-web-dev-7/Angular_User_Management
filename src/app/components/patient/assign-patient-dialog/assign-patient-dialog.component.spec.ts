import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPatientDialogComponent } from './assign-patient-dialog.component';

describe('AssignPatientDialogComponent', () => {
  let component: AssignPatientDialogComponent;
  let fixture: ComponentFixture<AssignPatientDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignPatientDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignPatientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
