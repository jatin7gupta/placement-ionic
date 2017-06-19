import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {StudentListPage} from '../student-list/student-list';
import {CompanyListPage} from "../company-list/company-list";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  loadStudentList() {
    this.navCtrl.push(StudentListPage);
  }
  loadCompanyList() {
    this.navCtrl.push(CompanyListPage);
  }
}
