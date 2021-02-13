import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { ViewControlComponent } from './components/view-control/view-control.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home', component: ViewControlComponent,
    canActivate: [
      MsalGuard
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
