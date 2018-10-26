import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component'
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { HomepageComponent } from './components/homepage/homepage.component';
import { NotesComponent } from './components/notes/notes.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { AuthGuard } from './auth.guard';
import { LabelComponent } from './components/label/label.component';


const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'resetpassword/:forgotToken', component: ResetpasswordComponent },

  
  { path:'homepage',component:HomepageComponent,canActivate: [AuthGuard],
  children:[
    {
      path: '', redirectTo: 'notes', pathMatch: 'full'
    },
    {
      path:'notes',component:NotesComponent
    },
    {
      path:'reminder',component:ReminderComponent
    },
    { path: 'label', component: LabelComponent },
    {
      path:'archive',component:ArchiveComponent
    },
    {
      path:'trash',component:TrashComponent
    }
  ]},
  { path: '', redirectTo: '/login', pathMatch: 'full'}

  
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
