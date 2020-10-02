import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileAnalysisComponent } from './components/file-analysis/file-analysis.component';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';

const routes: Routes = [ 
  { path: 'dashboard', component: PatientDashboardComponent },
  { path: 'file-analysis', component: FileAnalysisComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
