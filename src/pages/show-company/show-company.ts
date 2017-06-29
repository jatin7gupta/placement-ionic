import { Component } from '@angular/core';
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
  registration : any;
  hasValidDate: boolean;
  hasValidName: boolean;
  validate: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams, public companyService: CompanyService, public toastCtrl: ToastController ) {
    this.company = navParams.get('company');
    console.log(this.company);
    this.hasValidName = true;
    this.validate = true;
    this.hasValidDate = true;
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
    this.hasValidName = true;
    this.validate = true;
    this.hasValidDate = true;
    let date = new Date(this.ionicDateDisp);
     console.log(date.getMonth()+1);
     console.log(date.getDate());
     console.log(date.getFullYear());
     let updatedDate = date.getMonth()+1+ "-" + date.getDate() +"-"+ date.getFullYear();
     console.log(updatedDate);
    if(this.editValue == false) {
      if(this.company.name === undefined || this.company.name.length <2){
        this.hasValidName = false;
        this.validate = false;
      }
      if(this.ionicDateDisp === undefined) {
        this.hasValidDate = false;
        this.validate = false;
      }
      if(this.validate){
        this.companyService.updateCompany(this.company, updatedDate).subscribe(response => {
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
            this.presentToast();
            console.log(this.eor.status);
          })
      }

    }
    else {
    }
  }
  onEditClick(){
    this.editValue = false;
  }
  showRegistrations(company) {

    this.navCtrl.push(ShowRegistrationsPage, {
      company: company//,
      //registration : this.registration
    });
  }
  onDeleteClick(company) {
    this.companyService.delateCompany(company).subscribe(response => {
        console.log(response);
        let toast = this.toastCtrl.create({
          message: 'Item Deleted',
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
        this.presentToast();
        console.log(this.eor.status);
      })
  }
  registerStudent(company){
    this.navCtrl.push(RegisterStudentPage, {
      company: company
    });
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Please Check your Internet Connection',
      duration: 3000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      this.navCtrl.pop();
    });

    toast.present();
  }
}
