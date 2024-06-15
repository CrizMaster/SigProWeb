import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { HomeService } from '../../../core/services/home.service';
import { MatTab, MatTabGroup, MatTabContent, MatTabLabel } from '@angular/material/tabs';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MaintenanceProjectComponent } from './project/maintenance-project.component';
import { MaintenanceRrhhComponent } from './rrhh/maintenance-rrhh.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [MatTab, MatTabGroup, MatTabContent, MatCard, MatCardContent, MaintenanceRrhhComponent, MaintenanceProjectComponent, MatIcon, MatTabLabel],
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.css'
})
export class MaintenanceComponent implements OnInit, OnDestroy {


  constructor(
    private changeDetector: ChangeDetectorRef,
    private _homeService: HomeService
    ){

    }

  ngOnInit(): void { 
    this._homeService.titleApp.next('MAINTENANCE');
  }

  ngOnDestroy(): void {
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  } 
}
