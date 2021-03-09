import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  images = [];
  globalTestValidity = [false, false, false, false, false, false, false, false];


  connected:boolean = false;
  uidUser: string;
  gender: string ="";
  firstname: string = "";
  name: string;
  email: string;
  birthday: Date;
  firstTime: boolean = true;
  souplesse: number = 0;
  equilibre: number = 0;
  santeM: number = 0;
  endurance: number = 0;
  force: number = 0;
  etapeNumber: number = 0;
  currentTest: number = 0;
  
  constructor(
    public afDB: AngularFireDatabase,
    public afSG: AngularFireStorage
  ) { 
    this.getImagesDatabase();
  }
  
  ngOnInit() {
  }
  
  getImagesDatabase() {
    this.afDB.list('Images').snapshotChanges(['child_added']).subscribe(images => {
      images.forEach(image => {
        this.getImagesStorage(image);
      });
    });
  }

  getImagesStorage(image: any) {
    const imgRef = image.payload.exportVal().ref;
    this.afSG.ref(imgRef).getDownloadURL().subscribe(imgUrl => {
      console.log(imgUrl);
      this.images.push({
        name: image.payload.exportVal().name,
        url: imgUrl
      });
    });
  }



  setGlobalVars(afDB: AngularFireDatabase, uid: string){
    this.connected = true;
    this.uidUser = uid;
    
    
    this.afDB.list('Users/'+ uid + '/Profil').snapshotChanges().subscribe(
      data => data.forEach(dat =>{
        console.log(dat.key.valueOf);
        console.log(dat[0])
      })
    )
  /*
    afDB.list('Users/', ref => ref.orderByChild(uid + '/Profil/')).snapshotChanges().subscribe(users => {
        users.forEach(user =>{
          if(uid == user.key)
          {
            console.log(user.payload.exportVal().firstname);
            console.log(user.payload.exportVal().firstname);
            this.firstname = user.payload.exportVal().firstname;
            this.name = user.payload.exportVal().name;
            this.gender = user.payload.exportVal().gender;
            this.birthday = user.payload.exportVal().birthday;
          }
        })
    });
    /*afDB.list('Users/').snapshotChanges([]).subscribe(users => {
      users.forEach(user =>{
        if(user.key == uid){
          this.firstTime = user.payload.exportVal().firstTime;
          this.force = user.payload.exportVal().force;
          this.endurance = user.payload.exportVal().endurance;
          this.santeM = user.payload.exportVal().santeM;
          this.equilibre = user.payload.exportVal().equilibre;
          this.souplesse = user.payload.exportVal().souplesse;
          /*for(let i = 0; i < 8; i++)
            this.globalTestValidity[i] = user.payload.exportVal().globalTestValidity[i];
        }
      })
  });*/
  }



  resetGlobalVars(){
      this.connected = false;
      this.uidUser = null;
      this.firstname = null;
      this.name = null;
      this.email = null;
      this.birthday = null;
      this.gender = null;
      
  }
}
