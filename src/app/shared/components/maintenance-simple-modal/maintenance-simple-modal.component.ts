import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Subscription } from 'rxjs';
import { MaintenanceResponse } from '../../../core/models/maintenance.interface';
import { MaintenanceRrhhService } from '../../../core/services/maintenance/maintenance-rrhh.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-maintenance-simple-modal',
  standalone: true,
  imports: [MatButton, MatDialogModule, ReactiveFormsModule, MatFormField, 
    MatLabel, MatHint, MatInput, MatIconButton, MatIcon, MatProgressBar,MatSlideToggleModule ],
  templateUrl: './maintenance-simple-modal.component.html',
  styleUrl: './maintenance-simple-modal.component.css'
})
export class MaintenanceSimpleModalComponent implements OnInit, OnDestroy {

  loading: boolean = false; 
  form: FormGroup;
  title: string = '';

  public maintenance$: Subscription = new Subscription;

  constructor(
    public dialogModalRef: MatDialogRef<MaintenanceSimpleModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: MaintenanceResponse,
      private fb: FormBuilder,
      private changeDetector: ChangeDetectorRef,
      private _maintenanceRrhhService: MaintenanceRrhhService
    ){
      this.form = this.fb.group({
        description: [data.description, Validators.required],
        abbreviation: [data.abbreviation],
        confidential: [data.confidential],
        note: [data.note],
        sizefrom: [data.sizefrom],
        sizeuntil: [data.sizeuntil]
      });
    }

  ngOnInit(): void {
    this.loading = false;
    if(this.data.objAbbreviation){
      const abbr = this.form.get('abbreviation');
      abbr?.setValidators([Validators.required]);
    }
    if(this.data.objSize){
      const sfrom = this.form.get('sizefrom');
      sfrom?.setValidators([Validators.required]);

      const suntil = this.form.get('sizeuntil');
      suntil?.setValidators([Validators.required]);
    }
  }

  ngOnDestroy(): void {
    this.maintenance$.unsubscribe();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  guardar(){

    this.loading = true;    

    let info = this.form.value;

    let request: MaintenanceResponse = {
      description: info.description,
      id: this.data.id,
      title: this.data.title
    }

    if(request.id == ''){
      this.maintenance$ = this._maintenanceRrhhService.createMaintenance(request).subscribe({
        next:(resp:any) => {
          if(resp.success){
            setTimeout(() => {
              this.loading = false;
  
              this.dialogModalRef.close(resp);
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
    else{
      this.maintenance$ = this._maintenanceRrhhService.updateMaintenance(request).subscribe({
        next:(resp:any) => {
          if(resp.success){
            setTimeout(() => {
              this.loading = false;
  
              this.dialogModalRef.close(resp);
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

  }

}
