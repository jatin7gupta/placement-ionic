import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {StudentService} from '../../app/services/student.service';

@IonicPage()
@Component({
  selector: 'page-show-student',
  templateUrl: 'show-student.html',
})
export class ShowStudentPage {
  student: any;
  editValue = true;
  hasValidName = true;
  hasValidRollNo = true;
  hasValidCGPA = true;
  hasValidDepartment = true;
  departmentArray = ["CSE", "ME", "CV", "EEE", "ECE"];
  eor: any;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams, public studentService: StudentService) {
    this.student = navParams.get('student');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowStudentPage');
  }

  onEditClick() {
    this.editValue = false;
  }

  saveStudent() { //update student
    if (this.editValue == false) {
      this.hasValidName = this.hasValidCGPA = this.hasValidDepartment = this.hasValidRollNo = true;
      let validate = true;
      if (this.student.name === undefined || this.student.name.length < 2) {
        this.hasValidName = false;
        validate = false;
      }
      if (this.student.cgpa === undefined || this.student.cgpa == null || this.student.cgpa < 0 || this.student.cgpa > 10) {
        this.hasValidCGPA = false;
        validate = false;
      }
      if (this.student.rollno === undefined || this.student.rollno < 1 || this.student.rollno == null) {
        this.hasValidRollNo = false;
        validate = false;
      }
      if (this.student.department === undefined || this.student.department == null || this.student.department.length > 0) {
        if (this.departmentArray.indexOf(this.student.department) === -1) {
          this.hasValidDepartment = false;
          validate = false;
        }
      }
      if (!validate) {
        console.log("Not validated");
      }
      else {
        this.studentService.modifyStudent(this.student).subscribe(response => {
            this.presentToast('Modified');
          },
          err => {
            this.eor = err;
            this.presentToast('Check Internet, Could not modify');
            console.log(this.eor.status);
          })
      }
    }
  }

  onDeleteClick() { //Delete Student
    this.studentService.deleteStudent(this.student).subscribe(response => {
        this.presentToast('Deleted');
      },
      err => {
        this.eor = err;
        this.presentToast('Check Internet, Could not Delete');
        console.log(this.eor.status);
      })
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
