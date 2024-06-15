import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule , Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { CHART_COLORS, months, points, transparentize } from '../../../../core/functions/utils';

import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-risks',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule],
  templateUrl: './risks.component.html',
  styleUrl: './risks.component.css'
})
export class RisksComponent implements OnInit, OnDestroy {

  graf: boolean = true;
  public risks: any;

  constructor(
    private route: Router,
    private changeDetector: ChangeDetectorRef
    ){

    }

  ngOnInit(): void { 
    setTimeout(() => {
      this.createRisks();
    }, 1000);    
  }

  ngOnDestroy(): void {
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }



  createRisks(){

    function probability(value: number) {
      let strLabel: string = '';
      switch(value) {
        case 1: strLabel = 'Raro';
            break;
        case 2: strLabel = 'Improbable';
            break;
        case 3: strLabel = 'Es posible';
            break;
        case 4: strLabel = 'Probable';
            break;
        case 5: strLabel = 'Cierta';
            break;                      
      }    
      return strLabel;
    }

    function typeRisk(value: number) {
      let strLabel: string = '';
      switch(value) {
        case 1: strLabel = 'Insignificante';
            break;
        case 2: strLabel = 'Bajo';
            break;
        case 3: strLabel = 'Mediano';
            break;
        case 4: strLabel = 'Mayor';
            break;
        case 5: strLabel = 'Severo';
            break;                      
      }    
      return strLabel;
    }
  
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
    


    this.risks = new Chart("risks", {
      type: 'scatter', //this denotes tha type of chart      

      data: {// values on X-Axis
        labels: ['Insignificante','Bajo','Mediano','Mayor', 'Severo'], 
	      datasets: [
          {
            label: "Insignificante",
            data: [{x: 1, y:1, status: '1'}],
            borderColor: '#BFFF00',
            backgroundColor: transparentize(CHART_COLORS.lemon, 0.5),
            pointStyle: 'circle',
            pointRadius: 10,
            pointHoverRadius: 15
          },
          {
            label: "Bajo",
            data: [{x:2, y:3, status: '2'}],
            borderColor: 'green',
            backgroundColor: transparentize(CHART_COLORS.green, 0.5),
            pointStyle: 'circle',
            pointRadius: 10,
            pointHoverRadius: 15
          },
          {
            label: "Mediano",
            data: [{x:3, y:3, r:20, status: '2'}, {x:3, y:4, r:30, status: '3'}],
            borderColor: ['green','yellow'],
            backgroundColor: [transparentize(CHART_COLORS.green, 0.5), transparentize(CHART_COLORS.yellow, 0.5)],
            pointStyle: 'circle',
            pointRadius: [10, 30],
            pointHoverRadius: [15, 35],
          },
          {
            label: "Mayor",
            data: [{x:4, y:4, status: '3'}],
            borderColor: 'orange',
            backgroundColor: transparentize(CHART_COLORS.orange, 0.5),
            pointStyle: 'circle',
            pointRadius: 30,
            pointHoverRadius: 35
          },
          {
            label: "Severo",
            data: [{x:5, y:5, status: '3'}],
            borderColor: 'red',
            backgroundColor: transparentize(CHART_COLORS.red, 0.5),
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
                return "";
              },
              label: (ctd:any) =>{
                return "  " + typeRisk(ctd.parsed.x) + " - " + probability(ctd.parsed.y) + ": " + ctd.raw.status;
              }
            },
            cornerRadius: 5            
          }          
        },
        scales: {
          x: {
            min: 0,
            max: 6,
            ticks: { callback: function(value, index, ticks) {
                const idx: number = parseInt(value as string);
                return typeRisk(idx);
              }
            }
          },
          y: {
            min: 0,
            max: 6,
            ticks: { callback: function(value, index, ticks) {
              const idx: number = parseInt(value as string);
              return probability(idx);
              }
            }
          }
        }
      },
      plugins: [scatterDataLabels]      
    });   

    this.graf = false;   
  }  
}
