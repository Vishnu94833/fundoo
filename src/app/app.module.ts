import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import {
  MatSelectModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatDividerModule,
  MatListModule,
  MatFormFieldModule,
  MatButtonToggleModule,
  MatRadioModule,
  MatIconModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatSidenavModule,
  MatDialogModule,
  MatMenuModule,
  MatChipsModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpService } from './core/services/http/http.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { PinComponent } from './components/pin/pin.component';
import { MessagingService } from './core/services/messagingservice/messaging.service'
import { AsyncPipe } from '../../node_modules/@angular/common'
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { InterceptService } from './core/services/interceptor/interceptor.service';
import { AddcollaboratorComponent } from './components/addcollaborator/addcollaborator.component';
import { ErrorsHandler } from './core/services/errorHandler/error-handler';
import { QuestionanswerComponent } from './components/questionanswer/questionanswer.component';
import { BarRatingModule } from "ngx-bar-rating";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ProductcartComponent } from './components/productcart/productcart.component';
import { ProductconfirmComponent } from './components/productconfirm/productconfirm.component';
import { PaymentComponent } from './components/payment/payment.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';



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
    PinComponent,
    AddcollaboratorComponent,
    QuestionanswerComponent,
    ProductcartComponent,
    ProductconfirmComponent,
    PaymentComponent
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
    MatNativeDateModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule,
    BarRatingModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    MatTabsModule,
    MatSliderModule,
    MatStepperModule,
    MatProgressBarModule

  ],
  providers: [{
    provide: ErrorHandler,
    useClass: ErrorsHandler,
  }, InterceptService, {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptService,
    multi: true
  },
    HttpService, AuthGuard, AuthService, LoggerService, MessagingService, AsyncPipe],
  entryComponents: [ProductconfirmComponent, AddcollaboratorComponent, UpdatenotesComponent, CropimageComponent, ToolbarComponent, LabeldeleteComponent, TrashdeleteComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
