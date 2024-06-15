import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule , Router } from '@angular/router';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDrawer, MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, RouterModule , MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule, MatDrawer, MatListModule, MatTooltipModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit, OnDestroy {

  //@ViewChild('Drawer') private Drawer: MatDrawer;

  constructor(
    private route: Router,
    private changeDetector: ChangeDetectorRef
    ){

    }

  ngOnInit(): void {  
  }

  ngOnDestroy(): void {
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
}
