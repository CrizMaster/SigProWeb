import { HttpClient } from "@angular/common/http";
import { UserRequest } from "../models/user.interface";
import { Observable, of } from "rxjs";
import { StatusResponse } from "../models/status.interface";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private http: HttpClient){}

    login(user: UserRequest): Observable<StatusResponse<number>> {
        let status: StatusResponse<number> = {
            success: false,
            message: 'El usuario o contraseña no es válido.'
        };
        if(user.userName == 'crizmaster' && user.password == '123456'){
            status.success = true;
            status.message = '';
        }
        
        return of(status)
    }
}