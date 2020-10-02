import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { AddPatientDialogComponent } from '../add-patient-dialog/add-patient-dialog.component';
import { Patient } from "../../models/patient";

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})

export class PatientDashboardComponent implements OnInit {
  
  nColumns: Number;
  
  patients: Array<Patient> = [
    {
      name: 'John Doe',
      xRays: new Array<File>()
    },
  ];

  patientObserver = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      // Based on the screen size, switch from three to one column per row
      // Mobile
      if (matches) {
        this.nColumns = 1;
      }
      // Desktop
      else {
        this.nColumns = 3;
      }
      return this.patients;
    })
  );

  handleFileUpload(files: FileList, patient: Patient) {
    patient.xRays = patient.xRays.concat(Array.from(files));
  }

  removePatient(patient) {
    const index = this.patients.indexOf(patient, 0);
    if (index > -1) {
      this.patients.splice(index, 1);
    }
  }

  openDialog(): void {
    let newPatient: Patient = {
      name: "",
      xRays: new Array<File>()
    };
    
    const dialogRef = this.dialog.open(AddPatientDialogComponent, {
      width: '250px',
      data: { name: newPatient.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != "") {
        newPatient.name = result;
        this.patients.push(newPatient);
      }
    });

    return;
  }

  constructor(private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog) {}

  ngOnInit(): void {
  }

}
