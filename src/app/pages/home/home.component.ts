import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule , Router } from '@angular/router';
import { Subscription } from 'rxjs';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import { HomeService } from '../../core/services/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, RouterModule , MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule, MatDrawer, MatListModule, MatTooltipModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  //@ViewChild('Drawer') private Drawer: MatDrawer;

  title: string = 'DASHBOARD';
  mode: string = 'side';
  hasBackdrop: boolean = true;

  public titleApp$: Subscription = new Subscription;

  constructor(
    private route: Router,
    private changeDetector: ChangeDetectorRef,
    private _homeService: HomeService
    ){

    }

  ngOnInit(): void {
    // const elemt = document.querySelectorAll('.mat-drawer-inner-container');
    // elemt[0].className = "mat-drawer-content-notscrollx";    
    this.titleApp$ = this._homeService.titleApp.subscribe({
      next:(title) => {
        this.title = title;
      }
    });    
  }

  ngOnDestroy(): void {
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }  

  ir(menu: number, obj: any){
    switch(menu) { 
      case 1: {
        this.route.navigateByUrl('/home');
        break; 
      } 
      case 2: {
        this.route.navigateByUrl('/home/portfolio');
         break; 
      }
      case 3: {
        this.route.navigateByUrl('/home/project');
         break; 
      }
      case 4: {
        //this.route.navigateByUrl('/home/project');
         break; 
      }
      case 5: {
        this.route.navigateByUrl('/home/maintenance');
         break; 
      }
      default: { 
        this.route.navigateByUrl('/home');
        break; 
      } 
    } 
    obj.toggle()
  }  
  

}
