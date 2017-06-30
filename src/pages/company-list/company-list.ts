import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {CompanyService} from '../../app/services/company.service';
import {ShowCompanyPage} from '../show-company/show-company';
import {AddCompanyPage} from '../add-company/add-company';

@IonicPage()
@Component({
  selector: 'page-company-list',
  templateUrl: 'company-list.html',
})
export class CompanyListPage {
  companies: any;
  eor: any;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private companyService: CompanyService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyListPage');
  }

  ngOnInit() { // Get companies from API on init
    this.getCompanies();
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe(response => {
        this.companies = response;
      },
      err => {
        this.eor = err;
        console.log(this.eor.status);
        let toast = this.toastCtrl.create({ // if internet connection failed or DATA query not completed
          message: 'Please Check your Internet Connection',
          duration: 3000,
          position: 'middle'
        });

        toast.onDidDismiss(() => {
          this.navCtrl.pop();
        });

        toast.present();
      }
    )
  }

  companySelected(company) { // For loading the new page for displaying the selected item in detail
    this.navCtrl.push(ShowCompanyPage, {
      company: company
    });
  }

  addCompany() { // For adding new company
    this.navCtrl.push(AddCompanyPage);
  }

}
