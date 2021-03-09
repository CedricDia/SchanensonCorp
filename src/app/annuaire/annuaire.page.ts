import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { Plugins, AppState } from '@capacitor/core';

const { App } = Plugins; 

@Component({
  selector: 'app-annuaire',
  templateUrl: './annuaire.page.html',
  styleUrls: ['./annuaire.page.scss'],
})
export class AnnuairePage implements OnInit {


  listEapas = [];
  filterTerm: string;
  selected = false;
  indexSelect : number = 0;
  id : number = 0;
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
            profession: eapa.payload.exportVal().Profession,
            site: eapa.payload.exportVal().Site,
            url: eapa.payload.exportVal().Url,
            id: this.id,
          })
          this.id++;
        }
      })
    });
  }

  selectProfil(i : number)
  {
    this.selected = !this.selected;
    this.indexSelect = i;
  }

  async launchApp(){
    let ret = await App.canOpenUrl({ url: this.listEapas[this.indexSelect].url });
    let retx = await App.openUrl({ url: this.listEapas[this.indexSelect].url });
    console.log('Open url response: ', ret);
  }

}
