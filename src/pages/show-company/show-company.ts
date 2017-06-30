import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ShowRegistrationsPage} from '../show-registrations/show-registrations';
import {CompanyService} from '../../app/services/company.service';
import {RegisterStudentPage} from "../register-student/register-student";


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
  eor: any;
  registration: any;
  hasValidDate: boolean;
  hasValidName: boolean;
  validate: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams, public companyService: CompanyService, public toastCtrl: ToastController) {
    this.company = navParams.get('company');
    this.hasValidName = true;
    this.validate = true;
    this.hasValidDate = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowCompanyPage');
  }

  ngOnInit() {
    let parts = this.company.date_of_Placement.split('-'); //MM-DD-YYYY// month (parts[0]), Javascript counts months from 0: January - 0, February - 1, etc
    this.ionicDate = new Date(parts[2], parts[0] - 1, parts[1]);
    this.ionicDateDisp = this.ionicDate.toISOString();
  }

  saveCompany() {
    this.hasValidName = true;
    this.validate = true;
    this.hasValidDate = true;
    let date = new Date(this.ionicDateDisp);
    let updatedDate = date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();
    if (this.editValue == false) {
      if (this.company.name === undefined || this.company.name.length < 2) {
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
        this.companyService.updateCompany(this.company, updatedDate).subscribe(response => {
            this.presentToast('Updated');
          },
          err => {
            this.eor = err;
            this.presentToast('Check Internet, Not updated');
            console.log(this.eor.status);
          })
      }
    }
  }

  onEditClick() { //toggle edit value
    this.editValue = false;
  }

  showRegistrations(company) {
    this.navCtrl.push(ShowRegistrationsPage, {
      company: company
    });
  }

  onDeleteClick(company) {
    this.companyService.deleteCompany(company).subscribe(response => {
        this.presentToast('Deleted');
      },
      err => {
        this.eor = err;
        this.presentToast('Check Internet, Could not Delete');
        console.log(this.eor.status);
      }
    )
  }

  registerStudent(company) {
    this.navCtrl.push(RegisterStudentPage, {
      company: company
    });
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      this.navCtrl.popToRoot();
    });

    toast.present();
  }
}
