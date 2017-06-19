import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowStudentPage } from './show-student';

@NgModule({
  declarations: [
    ShowStudentPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowStudentPage),
  ],
  exports: [
    ShowStudentPage
  ]
})
export class ShowStudentPageModule {}
