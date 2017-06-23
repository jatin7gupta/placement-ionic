import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


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
  departmentArray = ["CSE","IT","ME","CV","BBA","BCOM","EEE","ECE"];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.student = navParams.get('student');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowStudentPage');
    console.log(this.student);
  }
  onEditClick(){
    this.editValue = false;
  }
  saveStudent() {
    if(this.editValue == false) {
     this.hasValidName = this.hasValidCGPA = this.hasValidDepartment = this.hasValidRollNo = true;
     let validate = true;
     if(this.student.name === undefined || this.student.name.length < 2) {
       this.hasValidName = false;
       validate = false;
     }
     if(this.student.cgpa === undefined || this.student.cgpa == null || this.student.cgpa < 0 || this.student.cgpa > 10) {
       this.hasValidCGPA = false;
       validate = false;
     }
     console.log(this.student.rollno);
     console.log(this.student.rollno === undefined);
     console.log(this.student.rollno == null);
     console.log(this.student.rollno > 0);
     console.log(typeof (this.student.rollno));
     if(this.student.rollno === undefined || this.student.rollno < 1 || this.student.rollno == null ) {
       this.hasValidRollNo = false;
       validate = false;
     }
     if(this.student.department === undefined || this.student.department == null || this.student.department.length == 0) {
       console.log(this.departmentArray.indexOf(this.student.department));
       if(!this.departmentArray.indexOf(this.student.department)){
        this.hasValidDepartment = false;
        validate = false;
       }
     }
     if(!validate) {
        console.log("Not validated");
      }
      else{
        console.log(this.student);
      }
      console.log(this.student);
    }
    else {

    }
  }
  onDeleteClick() {

  }

}
