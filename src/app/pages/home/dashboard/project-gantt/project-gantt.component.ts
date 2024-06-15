import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProjectGanttResponse } from '../../../../core/models/project.interface';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { RoundNumberPipe } from '../../../../shared/pipes/round-number.pipe';


@Component({
  selector: 'app-project-gantt',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, RoundNumberPipe],
  templateUrl: './project-gantt.component.html',
  styleUrl: './project-gantt.component.css'
})
export class ProjectGanttComponent implements OnInit, OnDestroy {

  loading: boolean = true;

  projects: ProjectGanttResponse[] = [];

  pageEvent?: PageEvent;
  page: number = 1;
  itemsByPage: number = 5;
  color:string = 'primary';

  constructor(
    private changeDetector: ChangeDetectorRef,
    private _dashboardService: DashboardService
    ){

    }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }    

  ngOnInit(): void {
    this.loading = true;
    this._dashboardService.listProjectsGantt().subscribe({
      next:(resp:any) => {
        if(resp.success){
          
          setTimeout(() => {
            
            this.loading = false;
            this.projects = resp.data;

          }, 3000);
        }
        else{
          
          this.loading = false;
        }
      }
    });
  }

  ngOnDestroy(): void {
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  expand(item: any){
    item.expanded = !item.expanded;
    console.log('ingresó');
  }

  pageChanged(event: PageEvent){
    // this.loading = true;

    // let pageIndex = event.pageIndex;
    // let pageSize = event.pageSize;

    // let previousIndex = event.previousPageIndex;
    // let previousSize = pageSize * pageIndex;

    // this.filter.Page = pageIndex + 1;
    // this.filter.ItemsByPage = pageSize;

    // this.dataSource = new MatTableDataSource<OrdenTrabajo>([]);

    // this.listaOTxDist2$ = this._ordenTrabajoService.listarOrdenesTrabajoxDistrito(this.filter).subscribe({
    //   next:(Data) => {
    //       if(Data.success){
    //         Data.data.forEach(elem => {
    //           elem.seleccion = false;
    //           elem.expandir = false;
    //         });

    //         this.fi.length = previousSize;
    //         this.fi.push(...Data.data);
    //         this.fi.length = Data.total;

    //         this.selection.selected.forEach(sel => {
    //           this.fi.forEach(item => {
    //             if(item.id == sel.id) item.seleccion = true;
    //           });
    //         });

    //         this.dataSource = new MatTableDataSource<OrdenTrabajo>(this.fi);
    //         this.dataSource._updateChangeSubscription();

    //         this.dataSource.paginator = this.paginator;

    //         //md.close();
    //         this.loading = false;
    //       }
    //       else{
    //         this.dataSource = new MatTableDataSource<OrdenTrabajo>([]);
    //         this.dataSource.paginator = this.paginator;
    //         //md.close();
    //         this.loading = false;
    //       }
    //   },
    //   error(err) {
    //     this.dataSource = new MatTableDataSource<OrdenTrabajo>([]);
    //     this.dataSource.paginator = this.paginator;
    //     //md.close();
    //     this.loading = false;
    //   },
    // })
  }  

}
