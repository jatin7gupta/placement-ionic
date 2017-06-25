import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {StudentService} from '../../app/services/student.service';
import {ShowStudentPage} from '../show-student/show-student';
import {AddStudentPage} from '../add-student/add-student';

@IonicPage()
@Component({
  selector: 'page-student-list',
  templateUrl: 'student-list.html',
})
export class StudentListPage {
 students: any;
 eor: any;
  constructor(public navCtrl: NavController,  private toastCtrl: ToastController, public navParams: NavParams, private studentService: StudentService) {
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
    },
      err => {
        this.eor = err;
        this.presentToast();
        console.log(this.eor.status);
      }
    )
  }
  studentSelected(student) {
    this.navCtrl.push(ShowStudentPage, {
      student: student
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
  addStudent() {
    this.navCtrl.push(AddStudentPage);
  }
}
