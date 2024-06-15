import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, input } from '@angular/core';

import { MatCard, MatCardHeader, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ProjectScheduleResponse } from '../../../../../core/models/project.interface';

@Component({
  selector: 'app-schedules',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardContent, MatCardTitle, MatProgressBar],
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.css'
})
export class SchedulesComponent implements OnInit, OnDestroy {

  @Input({required: true}) data: ProjectScheduleResponse = {};
  //public dataListDeliverables$: Subscription = new Subscription;
  
  constructor(
    private changeDetector: ChangeDetectorRef
    ){

    }

  ngOnInit(): void {
    // this.dataListDeliverables$ = this._overviewService.listDeliverables().subscribe({
    //   next:(resp:any) => {
    //     if(resp.success){
    //       setTimeout(() => {
    //         this.listDeliverables = resp.data;
    //       }, 1500);
    //     }
    //   },
    //   error(err:any) {
    //     //this.loading = false;
    //   },
    //   complete(){

    //   }
    // });    
  }

  ngOnDestroy(): void {
    //this.dataListDeliverables$.unsubscribe();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  } 
}
