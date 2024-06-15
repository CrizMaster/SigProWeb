import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import {MatMenu, MatMenuModule} from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatDialog, MatDialogClose } from '@angular/material/dialog';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MaintenanceConfig, MaintenanceResponse } from '../../../core/models/maintenance.interface';
import { MaintenanceRrhhService } from '../../../core/services/maintenance/maintenance-rrhh.service';
import { StatusResponse } from '../../../core/models/status.interface';
import { MaintenanceSimpleModalComponent } from '../maintenance-simple-modal/maintenance-simple-modal.component';
import { MessageComponent } from '../message/message.component';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { DisableToogleDirective } from '../../directives/disable-toggle.directive';

@Component({
  selector: 'app-maintenance-simple',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, MatTableModule, MatPaginatorModule, MatPaginator, MatSlideToggle, DisableToogleDirective,
    MatIconModule, MatMenu, MatMenuModule, MatButtonModule, MatFormFieldModule, MatLabel, MatInputModule, MatSnackBarModule, MatDialogClose],
  templateUrl: './maintenance-simple.component.html',
  styleUrl: './maintenance-simple.component.css'
})
export class MaintenanceSimpleComponent implements OnInit, OnDestroy, AfterViewInit {

  //@Input({ required: true }) config : MaintenanceConfig = {};
  @Input({ required: true }) title : string = '';

  loading: boolean = true;
  hiddenAbbr: boolean = true;
  hiddenSize: boolean = true;
  hiddenConf: boolean = true;
  displayedColumns: string[] = ['ID', 'Description', 'Abbreviation', 'SizeFrom', 'SizeUntil', 'Confidential', 'Action'];

  lista: MaintenanceResponse[] = [];
  totalData: number = 0;

  dataSource = new MatTableDataSource<MaintenanceResponse>();
  @ViewChild(MatPaginator) paginator! : MatPaginator;

  pageEvent?: PageEvent;
  page: number = 1;
  itemsByPage: number = 10;
  color:string = 'primary';

  constructor(
    private changeDetector: ChangeDetectorRef,
    private _maintenanceRrhhService: MaintenanceRrhhService,    
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ){

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }    

  ngOnInit(): void {
    this.loading = true;

    if(this.title == 'Phase') this.hiddenAbbr = false;
    else if(this.title == 'Size') this.hiddenSize = false;
    else if(this.title == 'SIGPRO Group') this.hiddenConf = false;
    
    this._maintenanceRrhhService.listMaintenance(this.title, 0, 5).subscribe({
      next:(resp:StatusResponse<MaintenanceResponse[]>) => {
        if(resp.success){
          setTimeout(() => {

            this.lista = resp.data??[];
            this.totalData = resp.total??0;

            this.dataSource = new MatTableDataSource<MaintenanceResponse>(this.lista);
            this.dataSource.paginator = this.paginator;
            this.loading = false;

          }, 500);
        }
        else{
          this.dataSource = new MatTableDataSource<MaintenanceResponse>([]);
          this.totalData = 0;
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
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;
    let previousIndex = event.previousPageIndex;
    let previousSize = pageSize * pageIndex;

    this.listGrid(previousSize, pageIndex, pageSize);
  }

  listGrid(currentSize: number, pageIndex: number, pageSize: number){
    this.loading = true;
    this.dataSource = new MatTableDataSource<MaintenanceResponse>([]);
    this._maintenanceRrhhService.listMaintenance(this.title, pageIndex, pageSize).subscribe({
      next:(resp:any) => {        
        if(resp.success){
          setTimeout(() => {    

            this.lista.length = currentSize;
            this.lista.push(...resp.data);
            this.lista.length = resp.total;

            this.dataSource = new MatTableDataSource<MaintenanceResponse>(this.lista);
            this.dataSource._updateChangeSubscription();
            this.dataSource.paginator = this.paginator;
            this.loading = false;
          }, 500);
        }
        else{
          this.dataSource = new MatTableDataSource<MaintenanceResponse>([]);
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

  configuration(data: MaintenanceResponse): MaintenanceResponse{
    
    if(this.title == 'SIGPRO Group') data.objConfidential = true;
    else if(this.title == 'Size') data.objSize = true;
    else if(this.title == 'Critical Level') data.objNote = true;
    else if(this.title == 'Phase') {
      data.objNote = true;
      data.objAbbreviation = true;
    }

    return data;
  }
  
  maintenancePosition(data: MaintenanceResponse){

    data = this.configuration(data);

    const dialogRef = this.dialog.open(MaintenanceSimpleModalComponent, {
      width: '650px',            
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      disableClose: true,
      data: data,
      scrollStrategy: new NoopScrollStrategy()
    });

    dialogRef.afterClosed().subscribe(resp => {
      if(resp.success){
        let snackBarRef = this.snackBar.openFromComponent(MessageComponent, {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          data: resp
        });
      }
    });     
  }

  addMaintenance(){
    let data:MaintenanceResponse = { 
      title: this.title,
      description : '',
      id: ''
    };

    this.maintenancePosition(data);  
  }

  editPosition(item: MaintenanceResponse){
    item.title = this.title,
    this.maintenancePosition(item);
  }

  deletePosition(item: any){
    
  }

}
