import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';

import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserRequest } from '../../core/models/user.interface';
import { AuthService } from '../../core/services/auth.service';
import { LocalService } from '../../core/services/local.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatDividerModule,
    MatCardModule, MatInputModule, MatProgressBarModule, MatIconModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  offline: boolean = false;
  public login$: Subscription = new Subscription;

  //form: FormGroup;
  form: FormGroup = new FormGroup({
    usuario: new FormControl(''),
    password: new FormControl('')
  });  

  loginError: string = '';
  msgStatus: string = 'logging in...';
  hide: boolean = true;
  viewProgress: boolean = false;  

  constructor(private fb: FormBuilder,
    private route: Router,
    private _authService: AuthService,
    private _localService: LocalService
    ){
      this.form = this.fb.group({
        usuario: ['', Validators.required],
        password: ['', Validators.required]
      })

    }

  ngOnInit(): void {
    this._localService.clearData();

    // this._publicService.currentComponentLogin.next(true);
    // this._authService.isLoggedIn.next(false);
    // this._authService.isOffLine.subscribe({
    //   next:(sw) => {
    //     this.offline = sw;
    //   }
    // }); 
  }

  ngOnDestroy(): void {
    this.login$.unsubscribe();
  }

  login(){
    this.loginError = '';
    if(this.form.valid){
      this.viewProgress = true;
      this.msgStatus = 'logging in...';
      setTimeout(() => {
        this.iniciarSesion();
      }, 1000);
    }
  }

  iniciarSesion()
  {  
    let info = this.form.value;
    let user: UserRequest = {
      userName: info.usuario,
      password: info.password
    }

    this.login$ = this._authService.login(user).subscribe({
        next:(resp) => {            
            //this._localService.removeData("Token");
            // this._localService.saveData("Token", JSON.stringify(resp))
            // this._authService.isLoggedIn.next(true);
            if(!resp.success){
              this.loginError = resp.message || '';
            }
            else{
              this.route.navigateByUrl('/home');
            }
        },
        error:(errorData) => {
            //this.loginError = 'El usuario o la contraseña no es válida';
            this.viewProgress = false;
        },
        complete:() => {
            //this.route.navigateByUrl('/intranet');
            this.viewProgress = false;                  
        }
    });
  }  

}
