import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {CompanyService} from "../../app/services/company.service";

@IonicPage()
@Component({
  selector: 'page-add-company',
  templateUrl: 'add-company.html',
})
export class AddCompanyPage {
  ionicDateDisp: any;
  name: any;
  hasValidName: boolean;
  hasValidDate: boolean;
  validate: boolean;
  eor: any;
  constructor(public navCtrl: NavController,public toastCtrl: ToastController , public navParams: NavParams, public companyService: CompanyService) {
    this.hasValidName = true;
    this.hasValidDate = true;
    this.validate = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCompanyPage');
  }
  saveCompany() {
    this.hasValidName = true;
    this.hasValidDate = true;
    this.validate = true;
    if(this.name === undefined||this.name.length < 2 ) {
      this.hasValidName = false;
      this.validate = false;
    }
    if(this.ionicDateDisp === undefined) {
      this.hasValidDate = false;
      this.validate = false;
    }
    if(this.validate) {
      console.log(this.ionicDateDisp);
      let date = new Date(this.ionicDateDisp);
      console.log(date.getMonth()+1);
      console.log(date.getDate());
      console.log(date.getFullYear());
      let updatedDate = date.getMonth()+1+ "-" + date.getDate() +"-"+ date.getFullYear();
      this.companyService.addCompany(this.name, updatedDate).subscribe(response => {
          console.log(response);
          let toast = this.toastCtrl.create({
            message: 'Item Saved',
            duration: 500,
            position: 'middle',
          });
          toast.onDidDismiss(() => {
            this.navCtrl.popToRoot();
          });
          toast.present();
        },
        err => {
          this.eor = err;
          console.log(this.eor.status);
        })
    }
  }

}
