import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ShowRegistrationsPage} from '../show-registrations/show-registrations';


@IonicPage()
@Component({
  selector: 'page-show-company',
  templateUrl: 'show-company.html',
})
export class ShowCompanyPage {
  company: any;
  test: any;
  ionicDate: any;
  ionicDateDisp: any;
  editValue = true;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.company = navParams.get('company');
    console.log(this.company);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowCompanyPage');

  }
  ngOnInit() {
    let parts =this.company.date_of_Placement.split('-'); //MM-DD-YYYY
    // month (parts[0]), Javascript counts months from 0: January - 0, February - 1, etc
    this.ionicDate = new Date(parts[2], parts[0]-1, parts[1]);
    this.ionicDateDisp = this.ionicDate.toISOString();
    console.log(this.ionicDate);
  }
  saveCompany() {
    let date = new Date(this.ionicDateDisp);
     console.log(date.getMonth()+1);
     console.log(date.getDate());
     console.log(date.getFullYear());
    if(this.editValue == false) {
      //perform database modify
    }
    else {

    }
  }
  onEditClick(){
    this.editValue = false;

  }
  showRegistrations(company) {
    this.navCtrl.push(ShowRegistrationsPage, {
      company: company
    });
  }


}
