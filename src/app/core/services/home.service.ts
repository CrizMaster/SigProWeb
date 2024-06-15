import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class HomeService {

    titleApp: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor(private http: HttpClient){}

    get getTitleApp():Observable<string>{
        return this.titleApp.asObservable();
    }
    
}