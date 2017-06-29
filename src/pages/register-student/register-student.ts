import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {StudentService} from '../../app/services/student.service';
import {RegistrationService} from '../../app/services/registration.service';


@IonicPage()
@Component({
  selector: 'page-register-student',
  templateUrl: 'register-student.html'
})
export class RegisterStudentPage {
  students: any;
  eor: any;
  company: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private studentService: StudentService,private registrationService: RegistrationService , public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterStudentPage');
  }
  ngOnInit(){
    this.getStudents();
    this.company = this.navParams.get('company');
    console.log(this.company);
  }
  getStudents() {
    this.studentService.getStudents().subscribe(response => {
        this.students = response;
        console.log(this.students);
      },
      err => {
        this.eor = err;
        this.presentToast();
        console.log(this.eor.status);
      }
    )
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
  presentToastSuccess() {
    let toast = this.toastCtrl.create({
      message: 'Operation Successful',
      duration: 1000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      this.navCtrl.popToRoot();
    });

    toast.present();
  }
  registerStudentNow(student) {
    this.registrationService.registerStudent(student._id, this.company._id).subscribe(response =>{
      console.log(response);
      this.presentToastSuccess()
    },
    err =>{
      console.log(err);
      this.presentToast()
    })
  }
  unregisterStudent(student) {
    this.registrationService.unregisterStudent(student._id, this.company._id).subscribe(response =>{
        console.log(response);
        this.presentToastSuccess()
      },
      err =>{
        console.log(err);
        this.presentToast()
      })
  }

}
