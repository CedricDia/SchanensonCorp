import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RicciPageRoutingModule } from './ricci-routing.module';

import { RicciPage } from './ricci.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RicciPageRoutingModule
  ],
  declarations: [RicciPage]
})
export class RicciPageModule {}
