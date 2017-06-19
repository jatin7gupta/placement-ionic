import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CompanyService} from '../../app/services/company.service';
import {ShowCompanyPage} from '../show-company/show-company';

@IonicPage()
@Component({
  selector: 'page-company-list',
  templateUrl: 'company-list.html',
})
export class CompanyListPage {
  companies: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private companyService: CompanyService) {
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
    })
  }
  companySelected(company) {
    this.navCtrl.push(ShowCompanyPage, {
      company: company
    });
  }
}
