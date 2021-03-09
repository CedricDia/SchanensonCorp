import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service'

@Component({
  selector: 'app-ricci',
  templateUrl: './ricci.page.html',
  styleUrls: ['./ricci.page.scss'],
})
export class RicciPage implements OnInit {

  constructor(
    public globalVars: GlobalService) { }

  ngOnInit() {
  }

  TestBegin: boolean;
  NextButton: boolean;
  End: boolean;

  BeginFunction(){this.TestBegin = true; console.log("ok");}

  //Gestion des questions
  currentPart = 0;
  allPart =["(A) COMPORTEMENTS SÉDENTAIRES",
            "(B) ACTIVITÉS PHYSIQUES DE LOISIRS (DONT SPORTS)",
            "(C) ACTIVITÉS PHYSIQUES QUOTIDIENNES"];

  currentQuestion = 0;
  maxQuestion = 9;
  allAQuestion =["Combien de temps passez-vous en position assise par jour (loisirs, télé, ordinateur, travail, etc) ?", 
                  "Pratiquez-vous régulièrement une ou des activités physiques ?",
                  "A quelle fréquence pratiquez-vous l’ensemble de ces activités ?",
                  "Combien de minutes consacrez-vous en moyenne à chaque séance d’activité physique ?",
                  "Habituellement comment percevez-vous votre effort ? Le chiffre 1 représentant un effort très facile et le 5, un effort difficile.",
                  "Quelle intensité d’activité physique votre travail requiert-il ?",
                  "En dehors de votre travail régulier, combien d’heures consacrez-vous par semaine aux travaux légers : bricolage, jardinage, ménage, etc. ?",
                  "Combien de minutes par jour consacrez-vous à la marche ?",
                  "Combien d’étages, en moyenne, montez-vous à pied chaque jour ?"];


  //Propositions
  Proposition = [["+ de 5h","4 à 5h", "3 à 4h", "2 à 3h", "Moins de 2h"],
                ["Non", "", "", "", "Oui"],
                ["1 à 2 fois / mois", "1 fois / semaine", "2 fois / semaine", "3 fois / semaine", "4 fois / semaine"],
                ["Moins de 15 min", "16 à 30 min", "31 à 45 min", "46 à 60 min", "Plus de 60 min"],
                ["1", "2", "3", "4", "5"],
                ["Légère", "Modérée", "Moyenne", "Intense", "Très intense"],
                ["Moins de 2 h", "3 à 4 h", "5 à 6h", "7 à 9h", "Plus de 10h"],
                ["Moins de 15 min", "16 à 30 min", "31 à 45 min", "46 à 60 min", "Plus de 60 min"],
                ["Moins de 2", "3 à 5", "6 à 10", "11 à 15", "Plus de 16"]];
  //Gestion du score

  ScorePerQuestion = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  scoreA = 0; 
  scoreB = 0;
  scoreC = 0;
  currentScore = 0;
  TotalScore = 0;
  previous: boolean = false;
  next: boolean = false;

  button_active : number;

  //Chaque CASE
  points = [
    {name: '1', isChecked: false, isActive: false, Create: true},
    {name: '2', isChecked: false, isActive: false, Create: true},
    {name: '3', isChecked: false, isActive: false, Create: true},
    {name: '4', isChecked: false, isActive: false, Create: true},
    {name: '5', isChecked: false, isActive: false, Create: true}
  ];

  saveAnswer = [[false,false,false,false,false], 
                [false,false,false,false,false],
                [false,false,false,false,false],
                [false,false,false,false,false],
                [false,false,false,false,false],
                [false,false,false,false,false],
                [false,false,false,false,false],
                [false,false,false,false,false],
                [false,false,false,false,false]];
  boxState = [false, false, false, false, false];

  nbr: number;

  
  //Ajoute la case cochée au score






  Fin : boolean = false;

  checkboxF(num : number)
  {
    for(let i = 0; i < 5; i++)
    {
      if(i != num)
      {
        this.saveAnswer[this.currentQuestion][i] = false;
        this.boxState[i] = false;
      }
      else
      {
        this.saveAnswer[this.currentQuestion][i] = !this.saveAnswer[this.currentQuestion][i];
      }

    }

    //Score
    

    if(this.saveAnswer[this.currentQuestion][num])
    { 
      this.ScorePerQuestion[this.currentQuestion] = num + 1;
      this.NextButton = true;}
    else
    { 
      this.ScorePerQuestion[this.currentQuestion] = 0;
      this.NextButton = false;}

    
    this.Fin = true;
    for(let i = 0; i < 9; i++)
    {
      if(this.ScorePerQuestion[i] == 0)
      {
        this.Fin = false;
      }
    }
    
  }

  YesNo : boolean = true;

  checkboxYesNo(num : number, state : boolean)
  {
    for(let i = 0; i < 5; i++)
    {
      if(i != num)
      {
        this.saveAnswer[this.currentQuestion][i] = false;
        this.boxState[i] = false;
      }
      else
      {
        this.saveAnswer[this.currentQuestion][i] = !this.saveAnswer[this.currentQuestion][i];
      }

    }
    if(this.saveAnswer[this.currentQuestion][num])
    {
      this.ScorePerQuestion[this.currentQuestion] = num + 1;
      this.NextButton = true;
      this.YesNo = state;
    }
    else
    {
      this.ScorePerQuestion[this.currentQuestion] = 0;
      this.NextButton = false;
    }
  }

  Next()
  {  

    this.NextButton = false;
    if(!this.YesNo && this.currentQuestion == 1)
    {
      this.currentQuestion += 3;
      //RESET
      for(let i = 0; i < 5; i++)
      {
        this.saveAnswer[2][i] = false;
        this.saveAnswer[2][i] = false;
        this.saveAnswer[2][i] = false;
      }

      this.ScorePerQuestion[2] = 1;
      this.saveAnswer[2][0] = true;
      this.ScorePerQuestion[3] = 1;
      this.saveAnswer[3][0] = true;
      this.ScorePerQuestion[4] = 1;
      this.saveAnswer[4][0] = true;
    }
    this.currentQuestion++;
    for(let i = 0; i < 5; i++)
    {
      this.boxState[i] = this.saveAnswer[this.currentQuestion][i];
    }

    if(this.ScorePerQuestion[this.currentQuestion] != 0)
    {
      this.NextButton = true;
    }
    else{
      this.NextButton = false;
    }

  }

  Previous()
  {  
    this.NextButton = true;
    if(!this.YesNo && this.currentQuestion == 5)
    {
      this.currentQuestion -= 3;
    }
    this.currentQuestion--;
    for(let i = 0; i < 5; i++)
    {
      this.boxState[i] = this.saveAnswer[this.currentQuestion][i];
    }

    if(this.ScorePerQuestion[this.currentQuestion] != 0)
    {
      this.NextButton = true;
    }
    else{
      this.NextButton = false;
    }
  }


  test : boolean = false;

  
  //Gestion de la navigation des questions
  
  PartManagement(){
    if(this.currentQuestion >= 0 && this.currentQuestion <= 0)
      this.currentPart = 0;
    else if(this.currentQuestion >= 1 && this.currentQuestion <= 4)
      this.currentPart = 1;
    else if(this.currentQuestion >= 5 && this.currentQuestion <= 9)
      this.currentPart = 2;
  }




  AffichageTotal()
  {
    for(let score of this.ScorePerQuestion)
    {
      console.log(score);
      this.TotalScore += score;
    }
    this.scoreA = this.ScorePerQuestion[0];
    for(let i = 1; i < 5; i++)
      this.scoreB += this.ScorePerQuestion[i];
      for(let i = 5; i < 9; i++)
        this.scoreC += this.ScorePerQuestion[i];
    this.End = true;
    this.globalVars.globalTestValidity[0] = true;

    this.globalVars.etapeNumber++; 
  }

  affichage()
  {
    for(let i = 0; i < 9; i++)
    {
      for(let j = 0; j < 5; j++)
      {
        console.log(this.saveAnswer[i][j]);
      }
    }

    for(let i =0; i < 9; i++)
    {
      console.log(this.ScorePerQuestion[i]);
    }
  }
}
