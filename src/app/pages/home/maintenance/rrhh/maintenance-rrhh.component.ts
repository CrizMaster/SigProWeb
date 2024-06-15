import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { MatTab, MatTabGroup, MatTabContent, MatTabsModule } from '@angular/material/tabs';
import { MatCard, MatCardContent } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { HomeService } from '../../../../core/services/home.service';
import { MaintenanceSimpleComponent } from '../../../../shared/components/maintenance-simple/maintenance-simple.component';

@Component({
  selector: 'app-maintenance-rrhh',
  standalone: true,
  imports: [MatTab, MatTabGroup, MatTabContent, MatCard, MatCardContent, MaintenanceSimpleComponent, MatIconModule, MatTabsModule],
  templateUrl: './maintenance-rrhh.component.html',
  styleUrl: './maintenance-rrhh.component.css'
})
export class MaintenanceRrhhComponent implements OnInit, OnDestroy {

  // configPosition: MaintenanceConfig = {
  //   titleGrid: 'Position list',
  //   titleBtnAdd: 'Add Position'
  // }
  // configArea: MaintenanceConfig = {
  //   titleGrid: 'Area list',
  //   titleBtnAdd: 'Add Area'
  // }
  

  constructor(
    private changeDetector: ChangeDetectorRef,
    private _homeService: HomeService
    ){

    }

  ngOnInit(): void { 
    this._homeService.titleApp.next('MAINTENANCE - RRHH');
  }

  ngOnDestroy(): void {
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  } 
}
