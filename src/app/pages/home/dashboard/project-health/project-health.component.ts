import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ProjectResponse } from '../../../../core/models/project.interface';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { StatusResponse } from '../../../../core/models/status.interface';

@Component({
  selector: 'app-project-health',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, MatTableModule, MatPaginatorModule],
  templateUrl: './project-health.component.html',
  styleUrl: './project-health.component.css'
})
export class ProjectHealthComponent implements OnInit, OnDestroy {

  loading: boolean = true;  
  displayedColumns: string[] = ['Project', 'Schedule', 'Budget', 'Risk'];

  lista: ProjectResponse[] = [];

  dataSource = new MatTableDataSource<ProjectResponse>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageEvent?: PageEvent;
  page: number = 1;
  itemsByPage: number = 10;
  color:string = 'primary';

  constructor(
    private changeDetector: ChangeDetectorRef,
    private _dashboardService: DashboardService
    ){

    }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }    

  ngOnInit(): void {
    this.loading = true;
    this._dashboardService.listProject().subscribe({
      next:(resp:any) => {
        if(resp.success){
          //this.paginator._intl.itemsPerPageLabel = "Elementos por página";
          setTimeout(() => {

            this.paginator.pageIndex = 0;
            this.paginator.pageSize = 10;
            //let fi: ProjectResponse[];

            // Data.data.forEach(elem => {
            //   elem.seleccion = false;
            //   elem.expandir = false;
            // });

            this.lista = resp.data;
            this.lista.length = resp.total;

            this.dataSource = new MatTableDataSource<ProjectResponse>(this.lista);
            this.dataSource.paginator = this.paginator;
            //md.close();
            this.loading = false;

          }, 3000);
        }
        else{
          this.dataSource = new MatTableDataSource<ProjectResponse>([]);
          this.dataSource.paginator = this.paginator;
          this.loading = false;
        }
      }
      // error(err) {
      //   this.loading = false;
      // },
      // complete(){

      // }
    });
  }

  ngOnDestroy(): void {
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
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
