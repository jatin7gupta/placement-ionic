import {Component} from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
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
  eor: any; //For error

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public companyService: CompanyService) {
    this.hasValidName = true;
    this.hasValidDate = true;
    this.validate = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCompanyPage');
  }

  saveCompany() { //For adding company to DB
    this.hasValidName = true;
    this.hasValidDate = true;
    this.validate = true;
    if (this.name === undefined || this.name.length < 2) {
      this.hasValidName = false;
      this.validate = false;
    }
    if (this.ionicDateDisp === undefined) {
      this.hasValidDate = false;
      this.validate = false;
    }
    if (!this.validate) {
      console.log('Not Validated');
    }
    else{
      let date = new Date(this.ionicDateDisp);
      let updatedDate = date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear(); //date.getMonth() + 1, Because of zero indexing
      this.companyService.addCompany(this.name, updatedDate).subscribe(response => {
          this.presentToast("Company Added");
        },
        err => {
          this.eor = err;
          console.log(this.eor.status);
          this.presentToast("Check Internet, operation Failed");
        })
    }
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 500,
      position: 'middle',
    });
    toast.onDidDismiss(() => {
      this.navCtrl.popToRoot();
    });
    toast.present();
  }
}
