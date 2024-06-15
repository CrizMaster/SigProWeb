import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import { StatisticsResponse } from '../../../core/models/statistics.interface';

@Component({
  selector: 'app-card-statistics',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, MatIconModule],
  templateUrl: './card-statistics.component.html',
  styleUrl: './card-statistics.component.css'
})
export class CardStatisticsComponent implements OnInit, OnDestroy {

  @Input({ required: true }) data?: StatisticsResponse = {};

  constructor(
    private changeDetector: ChangeDetectorRef
    ){}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  } 
}
