import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowRegistrationsPage } from './show-registrations';

@NgModule({
  declarations: [
    ShowRegistrationsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowRegistrationsPage),
  ],
  exports: [
    ShowRegistrationsPage
  ]
})
export class ShowRegistrationsPageModule {}
