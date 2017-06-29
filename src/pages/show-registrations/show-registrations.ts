import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {StudentService} from '../../app/services/student.service';
import {RegistrationService} from "../../app/services/registration.service";

@IonicPage()
@Component({
  selector: 'page-show-registrations',
  templateUrl: 'show-registrations.html',
})
export class ShowRegistrationsPage {
  company: any;
  eor: any;
  registrations: any;
  students: any;
  studentDisp: {
    id: string,
    name: string,
    rollno: string,
    cgpa: string,
    department: string
  }[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public studentService: StudentService, public toastCtrl: ToastController, public registrationService: RegistrationService) {
    this.company = navParams.get('company');
    console.log(this.company);
    this.registrations = navParams.get('registration');
    this.studentService.getStudents().subscribe(response => {
        this.students = response; //this is async. for loops execute before the students can came
        this.init();
        console.log(this.students);
      },
      err => {
        this.eor = err;
        this.presentToast();
        console.log(this.eor.status);
      }
    );
    this.registrationService.getRegistrations().subscribe(response =>{
      this.registrations = response;
      this.init(); //semaphore has poor performance. Created a local anonymous callback
      console.log(this.registrations);
    },err => {
      console.log(err);
      this.presentToast();
    });
  }

  init(){//done
    if(this.registrations === undefined || this.students === undefined) return;
    for(let regObj of this.registrations) {
      if (regObj.cId === this.company._id) {
        for (let studentObj of this.students) {
          if (studentObj._id === regObj.sId) {
            this.studentDisp.push({
              id: studentObj._id,
              name: studentObj.name,
              department: studentObj.department,
              rollno: studentObj.rollno,
              cgpa: studentObj.cgpa,
            });
          }
        }
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowRegistrationsPage');

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
  fillRegistrationList() {

  }
}
