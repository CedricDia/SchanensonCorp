import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnnuairePageRoutingModule } from './annuaire-routing.module';

import { AnnuairePage } from './annuaire.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnnuairePageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [AnnuairePage]
})
export class AnnuairePageModule {}
