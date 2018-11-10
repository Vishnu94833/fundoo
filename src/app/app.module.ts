import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import {
  MatSelectModule, MatInputModule, MatCardModule, MatButtonModule,
  MatDividerModule, MatListModule, MatFormFieldModule, MatButtonToggleModule,
  MatRadioModule, MatIconModule, MatSnackBarModule, MatToolbarModule,
  MatSidenavModule, MatDialogModule, MatMenuModule, MatChipsModule,
  MatCheckboxModule,MatDatepickerModule,MatNativeDateModule
} from '@angular/material'
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HttpService } from './core/services/http/http.service';
import { HttpClientModule } from '@angular/common/http';
import { SlidePanelComponent } from '../app/components/slide-panel/slide-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { LayoutModule } from '@angular/cdk/layout';
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
import { AuthGuard } from './core/services/authgaurd/auth.guard';
import { AuthService } from './core/services/authgaurd/auth.service';
import { AddnotesComponent } from './components/addnotes/addnotes.component';
import { CollectionnotesComponent } from './components/collectionnotes/collectionnotes.component';
import { UpdatenotesComponent } from './components/updatenotes/updatenotes.component';
import { LabelComponent } from './components/label/label.component';
import { LabelpipePipe } from '../app/core/pipe/labelpipe.pipe';
import { SearchComponent } from './components/search/search.component';
import { LabelslistComponent } from './components/labelslist/labelslist.component';
import { LoggerService } from './core/services/logger/logger.service';
import { CropimageComponent } from './components/cropimage/cropimage.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LabeldeleteComponent } from './components/labeldelete/labeldelete.component';
import { TrashdeleteComponent } from './components/trashdelete/trashdelete.component';


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
    LabelslistComponent,
    CropimageComponent,
    LabeldeleteComponent,
    TrashdeleteComponent,

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
    MatChipsModule,
    ImageCropperModule,
    MatDatepickerModule,
    MatNativeDateModule
    // FormControl  

  ],
  providers: [HttpService, AuthGuard, AuthService, LoggerService],
  entryComponents: [UpdatenotesComponent,CropimageComponent,ToolbarComponent,LabeldeleteComponent,TrashdeleteComponent],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
