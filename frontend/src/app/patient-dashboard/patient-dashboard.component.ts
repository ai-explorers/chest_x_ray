import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

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
    { name: 'Sebastian Steindl' },
    { name: 'Daniel Friedmann' },
    { name: 'Jan Raber' },
    { name: 'Eldar Sultanow' }
  ];

  /** Based on the screen size, switch from three to one column per row */
  patientObserver = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      // Handset
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


  // TODO: Import modules and fill Dialog Component
  openDialog(): void {
    let newPatient: PatientType = {
      name: "Max Muster"
    };
    this.patients.push(newPatient);
    return;
  }

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
  }

}
