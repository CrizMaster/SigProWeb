import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { CHART_COLORS, transparentize } from '../../../../core/functions/utils';

import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit, OnDestroy {

  graf2: boolean = true;
  
  public chartSchedule: any;

  constructor(
    private changeDetector: ChangeDetectorRef
    ){

    }

  ngOnInit(): void {
    setTimeout(() => {
      this.createChartSchedule();
    }, 2000);    
  }

  ngOnDestroy(): void {
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  createChartSchedule(): void {

    this.chartSchedule = new Chart("schedule", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: ['2023-12', '2024-01', '2024-02', '2024-03','2024-04'], 
	      datasets: [
          {
            label: "% Work Planned",
            data: [25, 50, 70, 90, 100],
            borderColor: 'blue',
            backgroundColor: transparentize(CHART_COLORS.blue, 0.5),
          },
          {
            label: "% Work Done",
            data: [21, 21, 21, 21, 21],
            borderColor: 'yellow',
            backgroundColor: transparentize(CHART_COLORS.yellow, 0.5),
          }  
        ]
      },
      options: {
        layout: {
          padding: {
            right: 20
          }
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          }
        },
        scales: {
          x: {
            min: 0,
            max: 100
          },
          y: {
            beginAtZero: true,
            grace: '5%'
          }
        }
      }      
    });
    this.graf2 = false;
  }   
}
