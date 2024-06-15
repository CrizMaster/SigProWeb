import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ManagerProjectResponse } from '../../../../core/models/project.interface';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { MatBadgeModule} from '@angular/material/badge';


@Component({
  selector: 'app-project-status',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, MatTableModule, MatPaginatorModule, MatBadgeModule],
  templateUrl: './project-status.component.html',
  styleUrl: './project-status.component.css'
})
export class ProjectStatusComponent implements OnInit, OnDestroy {

  isManagerRow = (index:any, item:any) => item.manager;

  loading: boolean = true;
  displayedColumns: string[] = ['Project', 'Schedule', 'Budget', 'Risk', 'Summary'];
  displayedDetailsColumns: string[] = ['Manager', 'Project', 'Schedule', 'Budget', 'Risk', 'Summary'];

  lista: ManagerProjectResponse[] = [];

  dataSource = new MatTableDataSource<any>([]);
  //@ViewChild(MatPaginator) paginator!: MatPaginator;

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
    this._dashboardService.listStatusProject().subscribe({
      next:(resp:any) => {
        if(resp.success){
          //this.paginator._intl.itemsPerPageLabel = "Elementos por página";
          setTimeout(() => {

            // this.paginator.pageIndex = 0;
            // this.paginator.pageSize = 10;


            let splitVals:ManagerProjectResponse [] = [];
            resp.data.forEach((el: any) => {
              splitVals.push({ 
                manager: el.manager, 
                totalProject: el.projects.length
              });

              el.projects.forEach((py:any) => {
                splitVals.push(py);
              });
            });

            console.log(splitVals);

            // this.lista = resp.data;
            // this.lista.length = resp.total;

            // console.log(this.lista);

            this.dataSource = new MatTableDataSource<any>(splitVals);
            //this.dataSource.paginator = this.paginator;
            //md.close();
            this.loading = false;

          }, 3000);
        }
        else{
          this.dataSource = new MatTableDataSource<any>([]);
          //this.dataSource.paginator = this.paginator;
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

  // ngAfterContentChecked(): void {
  //   this.changeDetector.detectChanges();
  // }

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
