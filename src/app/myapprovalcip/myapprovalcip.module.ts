import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyapprovalcipPage } from './myapprovalcip.page';

const routes: Routes = [
  {
    path: '',
    component: MyapprovalcipPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyapprovalcipPage]
})
export class MyapprovalcipPageModule {}
