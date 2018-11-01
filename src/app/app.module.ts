import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { HttpService } from '../app/services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { SlidePanelComponent } from '../app/components/slide-panel/slide-panel.component';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { NotesComponent } from './components/notes/notes.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RemindComponent } from './components/remind/remind.component';
import { CollaboratorComponent } from './components/collaborator/collaborator.component';
import { ChangecolorComponent } from './components/changecolor/changecolor.component';
import { AddimageComponent } from './components/addimage/addimage.component';
import { MoreComponent } from './components/more/more.component';
import { ArchivesComponent } from './components/archives/archives.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { AddnotesComponent } from './components/addnotes/addnotes.component';
import { CollectionnotesComponent } from './components/collectionnotes/collectionnotes.component';
import { UpdatenotesComponent } from './components/updatenotes/updatenotes.component';
import { LabelComponent } from './components/label/label.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import { LabelpipePipe } from './pipe/labelpipe.pipe';
import { SearchComponent } from './components/search/search.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SlidePanelComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    DashboardComponent,
    NotesComponent,
    ReminderComponent,
    ArchiveComponent,
    TrashComponent,
    HomepageComponent,
    ToolbarComponent,
    RemindComponent,
    CollaboratorComponent,
    ChangecolorComponent,
    AddimageComponent,
    MoreComponent,
    ArchivesComponent,
    AddnotesComponent,
    CollectionnotesComponent,
    UpdatenotesComponent,
    LabelComponent,
    LabelpipePipe,
    SearchComponent,
    
    // Notes1Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatToolbarModule,
    LayoutModule,
    MatSidenavModule,
    MatDialogModule,
    MatMenuModule,
    MatTooltipModule,
    FormsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatChipsModule
    // FormControl  

  ],
  providers: [HttpService,AuthGuard,AuthService],
  entryComponents:[UpdatenotesComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
