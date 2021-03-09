import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs'
import { NativeAudio } from '@ionic-native/native-audio';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  public time: BehaviorSubject<string> = new BehaviorSubject('00:00');
  public timer: number;  
  public interval;
  public state: 'start' | 'stop' = 'stop';
  public duree; 

  constructor(
    public platform: Platform, 
    private nativeAudio: NativeAudio
  )
    { 
      this.platform.ready().then(() => { 
        console.log("platform ready");

        // This is used to unload the track. It's useful if you're experimenting with track locations
        this.nativeAudio.unload('trackID').then(function() {
            console.log("unloaded audio!");
        }, function(err) {
            console.log("couldn't unload audio... " + err);
        });

        // 'trackID' can be anything
        this.nativeAudio.preloadComplex('trackID', 'assets/Sounds/Bip_timer.wav', 1, 1, 0).then(function() {
            console.log("audio loaded!");
        }, function(err) {
            console.log("audio failed: " + err);
        });
    });
    }
    playAudio() {
      console.log("playing audio");

      this.nativeAudio.play('trackID').then(function() {
          console.log("playing audio!");
      }, function(err) {
          console.log("error playing audio: " + err);
      });
}

  /* <h1>{{ time | async }}</h1>
  <ion-button (click)="startTimer()">start</ion-button>
  <ion-button (click)="continue(true)">continue</ion-button>
  <ion-button (click)="startCountdown(5)">compte A rebours</ion-button>
  <ion-button (click)="pause()">pause</ion-button>
  <ion-button (click)="stopTimer()">stop</ion-button>*/

  initTime(value : string)
  {
    this.time = new BehaviorSubject(value);
  }

  startCountdown(duration: number)
  {
    this.state = 'start';
    this.duree = duration;
    clearInterval(this.interval);
    this.timer = duration * 60;
    this.updateTimeValue(false);
    this.interval = setInterval( () => {
      this.updateTimeValue(false);
    }, 1000);
  }

  startTimer()
  {
    clearInterval(this.interval);
    this.state = 'start';
    this.timer = 0;
    this.updateTimeValue(true);
    this.interval = setInterval( () => {
      this.updateTimeValue(true);
    }, 1000);
  }
  
  continue(state : boolean)
  {
    clearInterval(this.interval);
    this.state = 'start';
    this.updateTimeValue(state);
    this.interval = setInterval( () => {
      this.updateTimeValue(state);
    }, 1000);
  }

  reload(val : number)
  {
    clearInterval(this.interval);
    this.state = 'stop';
    this.initTime('0' + val + ':00');
  }
  resetTimer()
  {
    clearInterval(this.interval);
    this.time.next(this.interval);
    this.state = 'stop';
  }

  
  stopTimer(){
    clearInterval(this.interval);
    //this.time.next(this.interval);
    this.state = 'stop';
  }

  updateTimeValue(state : boolean)
  {
    let minutes: any = this.timer / 60;
    let seconds: any = this.timer % 60;

    minutes = String('0' + Math.floor(minutes)).slice(-2);
    seconds = String('0' + Math.floor(seconds)).slice(-2);  

    const text = minutes + ':' + seconds;
    this.time.next(text);

    if(state)
    {
      ++this.timer;
    }
    else
    {
      
      --this.timer;
      if(this.timer < 0)
      {
        this.initTime('00:00');
        this.playAudio();
        this.stopTimer();
      }
    }


  }
}