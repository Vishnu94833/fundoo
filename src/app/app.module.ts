import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import {HttpService} from '../app/services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { SlidePanelComponent } from '../app/components/slide-panel/slide-panel.component';
import { FormsModule,ReactiveFormsModule ,FormControl} from '@angular/forms';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component'





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SlidePanelComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent
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
    MatSnackBarModule
    // FormControl
    
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
