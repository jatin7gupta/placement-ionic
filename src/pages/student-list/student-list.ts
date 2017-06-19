import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {StudentService} from '../../app/services/student.service';
import {ShowStudentPage} from '../show-student/show-student';

@IonicPage()
@Component({
  selector: 'page-student-list',
  templateUrl: 'student-list.html',
})
export class StudentListPage {
 students: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private studentService: StudentService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentListPage');
  }
  ngOnInit() {
    this.getStudents();
  }
  getStudents() {
    this.studentService.getStudents().subscribe(response => {
      this.students = response;
    })
  }
  studentSelected(student) {
    this.navCtrl.push(ShowStudentPage, {
      student: student
    });
  }
}
