import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardAvatar } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { StatusResponse } from '../../../core/models/status.interface';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [MatCardAvatar, MatIconModule, MatButtonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: StatusResponse<string>,
    private changeDetector: ChangeDetectorRef
    ){

    }

  ngOnInit(): void {  
    if(this.data.success){
      document.body.style.setProperty('--bg-color-message',"#dcfce7")
    }    
    else{
      document.body.style.setProperty('--bg-color-message',"#ffeaeb")
    }
  }

  ngOnDestroy(): void {
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
}
