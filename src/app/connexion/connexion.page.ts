import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@Angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

/*Import pour variables globales*/
import { GlobalService } from '../global.service';

import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage {

  date: Date = new Date();
  maxDate = this.date.getFullYear()-8;
  page = 0;
  error: boolean = false;

  subscribe = false;
  dataUser={
    email: '',
    password: '',
  };

  verifPassword:'';
  errorMailPassword: string; 
  errorDescription: string;

  path:string;

  dataUserInscription={
    email: '',
    password: '',
    gender: '',
    firstname: '',
    name: '',
    birthday: Date,
    firstTime: true,
    ricci: 0,
    equilibre: 0,
    souplesse: 0,
    force: 0,
    santeM: 0
    }

  constructor(
    public toastController: ToastController,
    public afAuth: AngularFireAuth,
    public globalVars: GlobalService,
    public afDB: AngularFireDatabase,
    public router: Router,
  ) { 

  }



  login(){
    console.log('email: '+this.dataUser.email);
    console.log('password: '+this.dataUser.password);

    if(this.dataUser.email != '' && this.dataUser.password != ''){
      this.afAuth.signInWithEmailAndPassword(this.dataUser.email, this.dataUser.password);
      this.afAuth.authState.forEach(auth => {
        if (!auth) {
          console.log('non connecté');
          this.globalVars.connected = false;
          
        } else {
          console.log('connecté: ' + auth.uid); 
          this.globalVars.setGlobalVars(this.afDB, auth.uid);
          this.router.navigate(['/home']);
        }
      })
      .catch(err => {
        console.log('Erreur: ' + err);
        this.errorMail();
      });
    }
  }

  async errorMail() {
    const toast = await this.toastController.create({
      message: 'Email ou mot de passe incorrect',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  signUp(){
    console.log(this.dataUserInscription);
    
    if(this.dataUserInscription.email != '' && this.dataUserInscription.password != ''){
      if(this.dataUserInscription.gender!='' && this.dataUserInscription.firstname!='' && this.dataUserInscription.name!='' && this.dataUserInscription.birthday!=null){
        this.afAuth.createUserWithEmailAndPassword(this.dataUserInscription.email, this.dataUserInscription.password);
        this.afAuth.authState.forEach(auth => {
          if (auth) {
            this.afDB.database.ref('Users/' + auth.uid + '/Profil').set({
              firstname: this.dataUserInscription.firstname,
              name: this.dataUserInscription.name,
              gender: this.dataUserInscription.gender,
              birthday: this.dataUserInscription.birthday
            });
            this.afDB.database.ref('Users/' + auth.uid + '/Tests').set({
              firstTime: this.dataUserInscription.firstTime,
              ricci: this.dataUserInscription.ricci,
              souplesse: this.dataUserInscription.souplesse,
              equilibre: this.dataUserInscription.equilibre,
              force: this.dataUserInscription.force,
              santeM: this.dataUserInscription.santeM,
              globalTestValidity: this.globalVars.globalTestValidity
            });
            this.globalVars.setGlobalVars(this.afDB, auth.uid);
            this.router.navigate(['/home']);
          }
        });
      }
      else{
        this.errorDescription = "Tous les champs ne sont pas remplis.";
      }
    }
    else{
      this.errorMailPassword = "Veuillez renseigner une adresse mail et un mot de passe.";
    }
  }

  setSubscribe(sub: boolean)
  {
    this.subscribe = sub;
  }

}
