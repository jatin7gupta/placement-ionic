import {Component} from '@angular/core';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private studentService: StudentService, private registrationService: RegistrationService, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterStudentPage');
  }

  ngOnInit() { //Getting the list of students
    this.getStudents();
    this.company = this.navParams.get('company'); //Getting the company to be registered with
  }

  getStudents() {
    this.studentService.getStudents().subscribe(response => {
        this.students = response;
      },
      err => {
        this.eor = err;
        this.presentToast('Check Internet Connection');
        console.log(this.eor.status);
      }
    )
  }

  registerStudentNow(student) {
    this.registrationService.registerStudent(student._id, this.company._id).subscribe(response => {
        this.presentToast('Operation Successful');
      },
      err => {
        console.log(err);
        this.presentToast('Check Internet, Operation Failed')
      })
  }

  unregisterStudent(student) {
    this.registrationService.unregisterStudent(student._id, this.company._id).subscribe(response => {
        this.presentToast('Operation Successful');
      },
      err => {
        console.log(err);
        this.presentToast('Check Internet, Operation Failed');
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
