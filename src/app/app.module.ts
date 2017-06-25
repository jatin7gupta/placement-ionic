import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from "@angular/http";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {StudentListPage} from '../pages/student-list/student-list';
import {CompanyListPage} from '../pages/company-list/company-list';
import {ShowStudentPage} from '../pages/show-student/show-student';
import {ShowCompanyPage} from '../pages/show-company/show-company';
import {ShowRegistrationsPage} from '../pages/show-registrations/show-registrations';
import {AddStudentPage} from '../pages/add-student/add-student';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    StudentListPage,
    CompanyListPage,
    ShowStudentPage,
    ShowCompanyPage,
    ShowRegistrationsPage,
    AddStudentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    StudentListPage,
    CompanyListPage,
    ShowStudentPage,
    ShowCompanyPage,
    ShowRegistrationsPage,
    AddStudentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
