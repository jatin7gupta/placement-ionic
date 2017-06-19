import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-show-student',
  templateUrl: 'show-student.html',
})
export class ShowStudentPage {
  student: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.student = navParams.get('student');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowStudentPage');
  }

}
