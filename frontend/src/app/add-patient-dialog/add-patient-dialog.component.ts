import { Component, Inject } from '@angular/core';
import { PatientType } from "../patient-dashboard/patient-dashboard.component";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-patient-dialog',
  templateUrl: './add-patient-dialog.component.html',
  styleUrls: ['./add-patient-dialog.component.scss']
})
export class AddPatientDialogComponent {

  constructor(public dialogRef: MatDialogRef<AddPatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public newPatient: PatientType) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
