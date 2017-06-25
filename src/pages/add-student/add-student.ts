import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {StudentService} from '../../app/services/student.service';
import {StudentListPage} from '../student-list/student-list';
@IonicPage()
@Component({
  selector: 'page-add-student',
  templateUrl: 'add-student.html',
})
export class AddStudentPage {
  name: string;
  rollno: number;
  department: string;
  cgpa: number;
  hasValidName = true;
  hasValidRollNo = true;
  hasValidCGPA = true;
  hasValidDepartment = true;
  eor: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public studentService: StudentService, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddStudentPage');
  }
  saveStudent() {
    this.hasValidName = this.hasValidCGPA = this.hasValidDepartment = this.hasValidRollNo = true;
    let validate = true;
    if (this.name === undefined || this.name.length < 2) {
      this.hasValidName = false;
      validate = false;
    }
    if (this.cgpa === undefined || this.cgpa == null || this.cgpa < 0 || this.cgpa > 10) {
      this.hasValidCGPA = false;
      validate = false;
    }
    if (this.rollno === undefined || this.rollno < 1 || this.rollno == null) {
      this.hasValidRollNo = false;
      validate = false;
    }
    if (this.department === undefined || this.department == null ) {

        this.hasValidDepartment = false;
        validate = false;
    }
    if (!validate) {
      console.log("Not validated");

    }
    else {
      this.studentService.addStudent(this.name, this.rollno, this.cgpa, this.department).subscribe(response => {
          console.log(response);
          let toast = this.toastCtrl.create({
            message: 'Item Saved',
            duration: 500,
            position: 'middle',
          });
          toast.onDidDismiss(() => {
            this.navCtrl.popToRoot(StudentListPage);
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
