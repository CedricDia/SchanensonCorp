import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MultipleTestsPageRoutingModule } from './multiple-tests-routing.module';

import { MultipleTestsPage } from './multiple-tests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MultipleTestsPageRoutingModule,
  ],
  declarations: [MultipleTestsPage]
})
export class MultipleTestsPageModule {}
