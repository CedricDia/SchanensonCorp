import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@Angular/fire/auth'
import { Router } from '@angular/router';
/*Import pour variables globales*/
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  
})
export class HomePage{

  value : any;
  constructor(
    public afAuth: AngularFireAuth,
    private _router: Router,
    public globalVars: GlobalService,/*Décralaration du service contenant les variables globales*/
  ) {
    if(this.globalVars.connected)
      this.msgWarning = false;
  }

  msgWarning: boolean;

  Launch: boolean = false;

  url_book = "./Book.png";

  Launch_function()
  {
    this.Launch = true;
  }
  

  ResetWarning()
  {
    this.msgWarning = false;
  }
  
  Autorisation(){
    if(this.globalVars.connected)
    { 
      this.msgWarning = false;
    }
    else{
      this.msgWarning = true;
    }
  }

  logout(){
    this.afAuth.signOut();
    this.globalVars.resetGlobalVars();
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        console.log('non connecté');
      } else {
        console.log('connecté: ' + auth.uid);
      }
    });
  }

  //////////////////
  
  
  //  
}
