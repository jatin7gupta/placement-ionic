import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowCompanyPage } from './show-company';

@NgModule({
  declarations: [
    ShowCompanyPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowCompanyPage),
  ],
  exports: [
    ShowCompanyPage
  ]
})
export class ShowCompanyPageModule {}
