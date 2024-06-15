import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { TablePortfolioComponent } from './table-portfolio/table-portfolio.component';
import { HomeService } from '../../../core/services/home.service';
import { PortfolioService } from '../../../core/services/portfolio.service';
import { StatisticsResponse } from '../../../core/models/statistics.interface';
import { StatisticsBarComponent } from '../../../shared/components/statistics-bar/statistics-bar.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [TablePortfolioComponent, StatisticsBarComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit, OnDestroy {

  listStatistics: StatisticsResponse[] = [];

  public dataStatistics$: Subscription = new Subscription;
  
  constructor(
    private changeDetector: ChangeDetectorRef,
    private _homeService: HomeService,
    private _portfolioService: PortfolioService
    ){}

  ngOnInit(): void { 
    this._homeService.titleApp.next('PORTFOLIO');

    this.dataStatistics$ = this._portfolioService.listStatistics().subscribe({
      next:(resp:any) => {
        if(resp.success){
          setTimeout(() => {
            this.listStatistics = resp.data;
          }, 1500);
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
    this.dataStatistics$.unsubscribe();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  } 
}
