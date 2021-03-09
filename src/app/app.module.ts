import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { GlobalService } from './global.service'
import { TimerService } from './Utility/timer.service'

import { NgApexchartsModule } from "ng-apexcharts";


export const firebaseConfig = {
  apiKey: "AIzaSyCZzetlGKDdfTaGGamHF-dZvqWiKFYrU4g",
  authDomain: "dragou-318ab.firebaseapp.com",
  databaseURL: "https://dragou-318ab.firebaseio.com",
  projectId: "dragou-318ab",
  storageBucket: "dragou-318ab.appspot.com",
  messagingSenderId: "149080277150",
  appId: "1:149080277150:web:f641768229bad8a97ffb8f"
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    NgApexchartsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  providers: [
    GlobalService,/*Variables globales*/
    TimerService,/*Variables globales*/
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {

}
