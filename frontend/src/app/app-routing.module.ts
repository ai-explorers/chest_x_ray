import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileAnalysisComponent } from './components/file-analysis/file-analysis.component';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { GetStartedComponent } from './components/get-started/get-started.component';

const routes: Routes = [ 
  { path: 'dashboard', component: PatientDashboardComponent },
  { path: 'file-analysis', component: FileAnalysisComponent },
  { path: '', component: WelcomeComponent },
  { path: 'get-started', component: GetStartedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
