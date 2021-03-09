import { Component, OnInit, SystemJsNgModuleLoader, ViewChild } from '@angular/core';
import { GlobalService } from '../../global.service';
import { TimerService } from '../../Utility/timer.service'
import { Router } from '@angular/router';

import { AngularFireAuth } from '@Angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexChart,
  ApexXAxis,
  ChartComponent
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
};


@Component({
  selector: 'app-global',
  templateUrl: './global.page.html',
  styleUrls: ['./global.page.scss'],
})
export class GlobalPage implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;


  constructor(
    public globalVars: GlobalService,
    private _router: Router,
    public afDB: AngularFireDatabase,
    public timerG: TimerService) 
  {
    this.chartOptions = {
      series: [
        {
          name: "Series 1",
          data: [80, 50, 30, 40, 100, 20]
        }
      ],
      chart: {
        height: 350,
        type: "radar"
      },
      title: {
        text: "Vos résultats"
      },
      xaxis: {
        categories: ["Equilibre", "Niveau d'activité physique", "Endurance", "Souplesse", "Force", "Santé mentale"]
      },
      
    };
  }


  public text: number = 0;

  ngOnInit() {
    console.log(this.globalVars.firstTime);
  }



  age: number;
  text_bouton: string = "Suivant";
  page = 0;
  dialogue: string = "Bonjour " + this.globalVars.firstname  +" ! Je suis Dragou et je serai votre partenaire dans votre activité physique !";
  showExercices: boolean = false;
  showResult: boolean = false;

  MajText()
  {
    this.page++;
    if(this.page == 1)
    {
      this.dialogue = "Tout comme vous, j’évoluerai au fil des séances… Jusqu’à ma forme finale !";
    }
    if(this.page == 2)
    {
      this.dialogue = "Mais avant ça faut bouger. Et pour bouger efficacement j’ai besoin de connaître vos aptitudes";
    }
    if(this.page == 3)
    {
      this.dialogue = "Passons quelques tests ensemble";
      //this.text_bouton = "Fin";
    }
    if(this.page == 4)
    {
      //this._router.navigate(['/', 'differents-tests-perso']);
      this.globalVars.firstTime = false;
      
      var updates = {};
      updates['Users/'+this.globalVars.uidUser] = this.globalVars.firstTime;
      console.log("la : " + this.globalVars.uidUser);
      console.log("et la : " + this.globalVars.firstTime);
      
      this.afDB.database.ref().update(updates);
      this.globalVars.setGlobalVars(this.afDB, this.globalVars.uidUser);
    }
    

  }
  
  setShowExercices()
  {
    this.showExercices = ! this.showExercices;
  }
  
  setshowResult()
  {
    this.showResult = ! this.showResult;
  }

  defineTest(value : number)
  {
    this.globalVars.currentTest = value;
  }
  
}
