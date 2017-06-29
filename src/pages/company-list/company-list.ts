import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {CompanyService} from '../../app/services/company.service';
import {ShowCompanyPage} from '../show-company/show-company';
import {HomePage} from '../home/home';
import {AddCompanyPage} from '../add-company/add-company';

@IonicPage()
@Component({
  selector: 'page-company-list',
  templateUrl: 'company-list.html',
})
export class CompanyListPage {
  companies: any;
  eor: any;
  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams, private companyService: CompanyService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyListPage');
  }
  ngOnInit() {
    this.getCompanies();
  }
  getCompanies() {
    this.companyService.getCompanies().subscribe(response => {
      this.companies = response;
    },
      err => {
        this.eor = err;
        console.log(this.eor.status);
        this.presentToast();
      }
    )
  }
  companySelected(company) {
    this.navCtrl.push(ShowCompanyPage, {
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
  addCompany(){
    this.navCtrl.push(AddCompanyPage);
  }
}
