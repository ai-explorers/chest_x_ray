import { Component, Inject } from '@angular/core';
import { Patient } from "../../models/patient";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-patient-dialog',
  templateUrl: './add-patient-dialog.component.html',
  styleUrls: ['./add-patient-dialog.component.scss']
})
export class AddPatientDialogComponent {

  constructor(public dialogRef: MatDialogRef<AddPatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public newPatient: Patient) { }

  onEnter(value: string)
  {
    this.dialogRef.close(value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
