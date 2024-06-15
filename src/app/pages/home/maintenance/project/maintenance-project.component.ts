import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { MatTab, MatTabGroup, MatTabContent, MatTabsModule } from '@angular/material/tabs';
import { MatCard, MatCardContent } from '@angular/material/card';
import { HomeService } from '../../../../core/services/home.service';
import { MaintenanceSimpleComponent } from '../../../../shared/components/maintenance-simple/maintenance-simple.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-maintenance-project',
  standalone: true,
  imports: [MatTab, MatTabGroup, MatTabContent, MatCard, MatCardContent, MaintenanceSimpleComponent, MatIconModule, MatTabsModule],
  templateUrl: './maintenance-project.component.html',
  styleUrl: './maintenance-project.component.css'
})
export class MaintenanceProjectComponent implements OnInit, OnDestroy {


  constructor(
    private changeDetector: ChangeDetectorRef,
    private _homeService: HomeService
    ){

    }

  ngOnInit(): void { 
    this._homeService.titleApp.next('MAINTENANCE - PROJECT');
  }

  ngOnDestroy(): void {
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  } 
}
