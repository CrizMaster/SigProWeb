import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule , Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { CHART_COLORS, months, points, transparentize } from '../../../core/functions/utils';

import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { count } from 'rxjs';
import { PortfolioTrackerComponent } from './portfolio-tracker/portfolio-tracker.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ProjectHealthComponent } from './project-health/project-health.component';
import { ProjectStatusComponent } from './project-status/project-status.component';
import { RisksComponent } from './risks/risks.component';
import { ProjectGanttComponent } from './project-gantt/project-gantt.component';
import { HomeService } from '../../../core/services/home.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, 
    PortfolioTrackerComponent, ScheduleComponent, ProjectHealthComponent, ProjectStatusComponent, RisksComponent, ProjectGanttComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {

  graf: boolean = false;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private _homeService: HomeService
    ){

    }

  ngOnInit(): void { 
    this._homeService.titleApp.next('DASHBOARD');
  }

  ngOnDestroy(): void {
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  } 
}
