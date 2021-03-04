import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-annuaire',
  templateUrl: './annuaire.page.html',
  styleUrls: ['./annuaire.page.scss'],
})
export class AnnuairePage implements OnInit {

  listEapas = [];
  listEapasBackup = [];
  isItemAvailable = false;
  constructor(
    public afDB: AngularFireDatabase
  ) { 
    this.getEapasDatabase()
  }

  ngOnInit() {
  }

  getEapasDatabase() {
    // pour récupérer les informations des eapas
    this.afDB.list('EAPAS').snapshotChanges([]).subscribe(eapas => {
      this.listEapas.splice(0,this.listEapas.length);
      eapas.forEach(eapa =>{
        if(eapa.payload.exportVal().Validite){
          this.listEapas.push({
            nom: eapa.payload.exportVal().Nom,
            prenom: eapa.payload.exportVal().Prenom,          
            diplome: eapa.payload.exportVal().Diplome,
            description: eapa.payload.exportVal().Description,
            tel: eapa.payload.exportVal().Tel,
            adresse: eapa.payload.exportVal().Adresse,
            mail: eapa.payload.exportVal().Mail,
            pict_profil: eapa.payload.exportVal().Pict_profil,
          })
        }
      })
    });
  }

  
  async getItems(evt) {
  this.getEapasDatabase();
  const val = evt.srcElement.value;


  //const val = ev.target.value;

  // if the value is an empty string don't filter the items
  if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.listEapas = this.listEapas.filter((currentEapas) => {
          return (currentEapas.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
  } else {
      this.isItemAvailable = false;
  }
/*

  if (!searchTerm) {
    return;
  }

  this.listEapas = this.listEapas.filter(currentEapas => {
    if (currentEapas.nom && searchTerm) {
      console.log(currentEapas.nom);
      console.log(searchTerm);
      return (currentEapas.nom.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
    }
  });*/
}
}
