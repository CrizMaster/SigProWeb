import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ManagerProtfolioResponse, ProtfolioResponse } from '../../../../core/models/protfolio.interface';
import { PortfolioService } from '../../../../core/services/portfolio.service';
import { StatusResponse } from '../../../../core/models/status.interface';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table-portfolio',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, MatTableModule, MatPaginatorModule, MatIconModule],
  templateUrl: './table-portfolio.component.html',
  styleUrl: './table-portfolio.component.css'
})
export class TablePortfolioComponent implements OnInit, OnDestroy {

  isAreaRow = (index:any, item:any) => item.area;

  loading: boolean = true;

  displayedColumns: string[] = ['Project', 'KPI1', 'KPI2', 'KPI3', 'Stages'];
  displayedDetailsColumns: string[] = ['Area', 'Project', 'KPI1', 'KPI2', 'KPI3', 'Stages'];

  lista: ManagerProtfolioResponse[] = [];
  
  dataSource = new MatTableDataSource<ProtfolioResponse>([]);

  public dataProtfolio$: Subscription = new Subscription;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private _portfolioService: PortfolioService
    ){

    }

  ngOnInit(): void {
    this.loading = true;
    this.dataProtfolio$ = this._portfolioService.listProtfolio().subscribe({
      next:(resp:StatusResponse<ProtfolioResponse[]>) => {
        if(resp.success){
          //this.paginator._intl.itemsPerPageLabel = "Elementos por página";
          setTimeout(() => {            

            this.dataSource = new MatTableDataSource<ProtfolioResponse>(resp.data);
            //this.dataSource.paginator = this.paginator;
            //md.close();
            this.loading = false;
          }, 2000);
        }
        else{
          this.dataSource = new MatTableDataSource<ProtfolioResponse>([]);
          this.loading = false;
        }
      },
      error:(err: any) => {
        console.log('error');
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.dataProtfolio$.unsubscribe();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  } 
}
