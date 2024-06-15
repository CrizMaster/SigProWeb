import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { StatisticsResponse } from '../../../core/models/statistics.interface';
import { CardStatisticsComponent } from '../card-statistics/card-statistics.component';
import { MatCard, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-statistics-bar',
  standalone: true,
  imports: [CardStatisticsComponent, MatCard, MatCardFooter, MatCardHeader, MatCardTitle, MatProgressBarModule],
  templateUrl: './statistics-bar.component.html',
  styleUrl: './statistics-bar.component.css'
})
export class StatisticsBarComponent implements OnInit, OnDestroy {

  @Input({ required: true }) listStatistics?: StatisticsResponse[] = [];

  constructor(
    private changeDetector: ChangeDetectorRef
    ){}

  ngOnInit(): void {}

  ngOnDestroy(): void {
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  } 
}
