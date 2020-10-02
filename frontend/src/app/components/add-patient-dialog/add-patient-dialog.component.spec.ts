import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatientDialogComponent } from './add-patient-dialog.component';

describe('AddPatientDialogComponent', () => {
  let component: AddPatientDialogComponent;
  let fixture: ComponentFixture<AddPatientDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPatientDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPatientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
