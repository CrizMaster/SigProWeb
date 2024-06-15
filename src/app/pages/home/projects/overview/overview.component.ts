import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { StatisticsResponse } from '../../../../core/models/statistics.interface';
import { StatisticsBarComponent } from '../../../../shared/components/statistics-bar/statistics-bar.component';
import { Subscription } from 'rxjs';
import { OverviewService } from '../../../../core/services/projects/overview.service';
import { DeliverablesComponent } from './deliverables/deliverables.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { ProjectScheduleResponse } from '../../../../core/models/project.interface';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [StatisticsBarComponent, DeliverablesComponent, SchedulesComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent implements OnInit, OnDestroy {

  listStatistics: StatisticsResponse[] = [];
  dataSchedule: ProjectScheduleResponse = {};

  public dataListStatistics$: Subscription = new Subscription;
  
  constructor(
    private changeDetector: ChangeDetectorRef,
    private _overviewService: OverviewService
    ){

    }

  ngOnInit(): void {
    this.dataListStatistics$ = this._overviewService.listStatistics().subscribe({
      next:(resp:any) => {
        if(resp.success){
          setTimeout(() => {
            this.listStatistics = resp.data;


            let schedule: ProjectScheduleResponse = {
              nameStatus: 'Off Track',
              codeStatus: 3,
              fechaInicio: '30 Jun 23',
              fechaFin: '25 Aug 23',
              avance: 30,
              loading: false
            };
            this.dataSchedule = schedule;

          }, 1300);
        }
      },
      error(err:any) {
        //this.loading = false;
      },
      complete(){

      }
    });        
  }

  ngOnDestroy(): void {
    this.dataListStatistics$.unsubscribe();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  } 
}
