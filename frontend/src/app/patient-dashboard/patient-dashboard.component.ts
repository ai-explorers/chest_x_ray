import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { AddPatientDialogComponent } from '../add-patient-dialog/add-patient-dialog.component';


export type PatientType = {
  name: string,
  //xRays: Array<File>
}

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})

export class PatientDashboardComponent implements OnInit {
  
  nColumns: Number = 3;
  // TODO: Move Type definition to extra file, look up best practice
  patients: Array<PatientType> = [
    { name: 'John Doe' },
  ];

  /** Based on the screen size, switch from three to one column per row */
  patientObserver = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      // Mobile
      if (matches) {
        this.nColumns = 1;
        return this.patients;
      }
      // Desktop
      this.nColumns = 3;
      return this.patients;
    })
  );

  handleFileUpload() {
    return;
  }

  openDialog(): void {
    let newPatient: PatientType = {
      name: ""
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
