import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StudentService } from './services/student.service';
import {CompanyService} from './services/company.service';

import { HomePage } from '../pages/home/home';
import {RegistrationService} from './services/registration.service';

@Component({
  templateUrl: 'app.html',
  providers: [StudentService, CompanyService, RegistrationService]
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

