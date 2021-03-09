import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Platform } from '@ionic/angular';

import { GlobalService } from './global.service'
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Accueil', url: '/home', icon: 'home' },
    { title: 'Tu pues', url: '/connexion', icon: 'paper-plane' },
  ];
  
  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    public afDB: AngularFireDatabase,
    private platform: Platform,
    public globalVars : GlobalService,
    ) {	
      this.initializeApp();
    }

      //Est-ce qu'il est connecté
  initializeApp() {
    this.platform.ready().then(() => {
      this.afAuth.authState.subscribe(auth => {
        if (!auth) {
          console.log('non connecté');
          this.router.navigateByUrl('/connexion');
        } else {
          this.router.navigateByUrl('/');
          console.log('Connecté: ' + auth.uid);
          this.globalVars.setGlobalVars(this.afDB, auth.uid)
        }
      });
    });
  }
}
