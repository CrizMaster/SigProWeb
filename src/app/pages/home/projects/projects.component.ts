import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { HomeService } from '../../../core/services/home.service';
import { MatTab, MatTabGroup, MatTabContent } from '@angular/material/tabs';
import { MatCard, MatCardContent } from '@angular/material/card';
import { OverviewComponent } from './overview/overview.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [MatTab, MatTabGroup, MatTabContent, MatCard, MatCardContent, OverviewComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit, OnDestroy {


  constructor(
    private changeDetector: ChangeDetectorRef,
    private _homeService: HomeService
    ){

    }

  ngOnInit(): void { 
    this._homeService.titleApp.next('PROJECTS');
  }

  ngOnDestroy(): void {
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  } 
}
