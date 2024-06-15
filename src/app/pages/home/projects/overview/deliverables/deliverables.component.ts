import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { OverviewService } from '../../../../../core/services/projects/overview.service';

import { MatCard, MatCardHeader, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatIcon } from '@angular/material/icon';
import { DeliverablesResponse } from '../../../../../core/models/deliverables.interface';

@Component({
  selector: 'app-deliverables',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardContent, MatCardTitle, MatProgressBar, MatIcon],
  templateUrl: './deliverables.component.html',
  styleUrl: './deliverables.component.css'
})
export class DeliverablesComponent implements OnInit, OnDestroy {

  listDeliverables: DeliverablesResponse[] = [];

  public dataListDeliverables$: Subscription = new Subscription;
  
  constructor(
    private changeDetector: ChangeDetectorRef,
    private _overviewService: OverviewService
    ){

    }

  ngOnInit(): void {
    this.dataListDeliverables$ = this._overviewService.listDeliverables().subscribe({
      next:(resp:any) => {
        if(resp.success){
          setTimeout(() => {
            this.listDeliverables = resp.data;
          }, 1500);
        }
      },
      error(err:any) {
        //this.loading = false;
      },
      complete(){

      }
    });    
  }

  ngOnDestroy(): void {
    this.dataListDeliverables$.unsubscribe();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  } 
}
