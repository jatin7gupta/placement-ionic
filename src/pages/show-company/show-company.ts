import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {combineAll} from "rxjs/operator/combineAll";
import {ShowRegistrationsPage} from '../show-registrations/show-registrations';


@IonicPage()
@Component({
  selector: 'page-show-company',
  templateUrl: 'show-company.html',
})
export class ShowCompanyPage {
  company: any;
  test: any;
  myDate: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.company = navParams.get('company');
    console.log(this.company);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowCompanyPage');
  }
  saveCompany() {
    console.log('save');
    console.log(this.myDate);
  }
  showRegistrations(company) {
    this.navCtrl.push(ShowRegistrationsPage, {
      company: company
    });
  }

}
