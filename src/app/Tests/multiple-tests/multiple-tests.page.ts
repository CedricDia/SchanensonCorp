import { Component, OnInit } from '@angular/core';
import { TimerService } from '../../Utility/timer.service'
import { GlobalService } from '../../global.service'

@Component({
  selector: 'app-multiple-tests',
  templateUrl: './multiple-tests.page.html',
  styleUrls: ['./multiple-tests.page.scss'],
})
export class MultipleTestsPage implements OnInit{


  public firstStart: boolean = true;

  constructor(
    public timerG: TimerService,
    public globalVars: GlobalService,
  ) { 
    
    if(this.globalVars.currentTest == 1)
      this.timerG.initTime('02:00');
    else if(this.globalVars.currentTest == 2)
      this.timerG.initTime('00:00');
  }

  ngOnInit() {
    if(this.globalVars.currentTest == 1)
      this.timerG.initTime('02:00');
    else if(this.globalVars.currentTest == 2)
      this.timerG.initTime('00:00');
  }

  setFirstStart(val : boolean)
  {
    this.firstStart = val;
  }
  
}
