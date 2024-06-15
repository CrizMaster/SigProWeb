import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule , Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { CHART_COLORS, months, points, transparentize } from '../../../../core/functions/utils';

import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { count } from 'rxjs';

@Component({
  selector: 'app-portfolio-tracker',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule],
  templateUrl: './portfolio-tracker.component.html',
  styleUrl: './portfolio-tracker.component.css'
})
export class PortfolioTrackerComponent implements OnInit, OnDestroy {

  graf1: boolean = true;
  public chartTracker: any;

  constructor(
    private route: Router,
    private changeDetector: ChangeDetectorRef
    ){

    }

  ngOnInit(): void { 
    setTimeout(() => {
      this.createChartTracker();
    }, 1000);    
  }

  ngOnDestroy(): void {
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  createChartTracker(){
  
    const scatterDataLabels = {
      id: 'scatterDataLabels',
      afterDatasetsDraw(chart:any, args:any, options:any){
        const { ctx }  = chart;
        ctx.save();
        ctx.font = '12px sans-serif';
  
        for(let x = 0; x < chart.config.data.datasets.length; x++){
          for(let i = 0; i < chart.config.data.datasets[x].data.length; i++){

            if(chart.isDatasetVisible(x) === true){
              ctx.fillStyle = '#666';
            }
            else{
              ctx.fillStyle = 'transparent';
            }

            let textWitdh = ctx.measureText(chart.config.data.datasets[x].data[i].status).width;
            ctx.fillText(chart.config.data.datasets[x].data[i].status, chart.getDatasetMeta(x).data[i].x - (textWitdh/2),
            chart.getDatasetMeta(x).data[i].y);
          }          
        }
      }
    }

    this.chartTracker = new Chart("tracker", {
      type: 'scatter', //this denotes tha type of chart      

      data: {// values on X-Axis
        labels: ['2024-01','2024-02','2024-03','2024-04'], 
	      datasets: [
          {
            label: "Off Track",
            data: [{x: 10, y:1, status: '€ 10K'}, {x:null, y:null, status: ''}, {x:null, y:null, status: ''}, {x:null, y:null, status: ''}],
            borderColor: 'blue',
            backgroundColor: transparentize(CHART_COLORS.blue, 0.5),
            pointStyle: 'circle',
            pointRadius: 10,
            pointHoverRadius: 15
          },
          {
            label: "At Risk",
            data: [{x:null, y:null, status: ''}, {x:35, y:2, status: '€ 35K'}, {x:null, y:null, status: ''}, {x:null, y:null, status: ''}],
            borderColor: 'orange',
            backgroundColor: transparentize(CHART_COLORS.orange, 0.5),
            pointStyle: 'circle',
            pointRadius: 20,
            pointHoverRadius: 25
          },
          {
            label: "On Track",
            data: [{x:null, y:null, status: ''}, {x:null, y:null, status: ''}, {x:65, y:3, status: '€ 65K'}, {x:null, y:null, status: ''}],
            borderColor: 'green',
            backgroundColor: transparentize(CHART_COLORS.green, 0.5),
            pointStyle: 'circle',
            pointRadius: 30,
            pointHoverRadius: 35
          }  
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          tooltip: {            
            callbacks: {
              title: (ctd:any) =>{
                return ctd.label;
              },
              label: (ctd:any) =>{
                return "Project " + ctd.parsed.y + ": € " + ctd.parsed.x + 'K';
              }
            },
            cornerRadius: 5            
          }          
        },
        scales: {
          x: {
            min: 0,
            max: 100,
          },
          y: {
            min: 0,
            max: 4,
            ticks: { callback: function(value, index, ticks) {
                return index % 2 === 0 && index != 0 ? 'Project ' + value : '';
              }
            }
          }
        }
      },
      plugins: [scatterDataLabels]      
    });   

    this.graf1 = false;   
  }  
}
