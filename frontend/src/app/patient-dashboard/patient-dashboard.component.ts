import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent implements OnInit {

  
  nColumns: Number = 3;
  
  patients = [
    { title: 'Sebastian Steindl', cols: 1, rows: 1 },
    { title: 'Daniel Friedmann', cols: 1, rows: 1 },
    { title: 'Jan Raber', cols: 1, rows: 1 },
    { title: 'Eldar Sultanow', cols: 1, rows: 1 }
  ];

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
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

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
  }

}
