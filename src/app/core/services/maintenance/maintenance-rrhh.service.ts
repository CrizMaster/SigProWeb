import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { StatusResponse } from "../../models/status.interface";
import { MaintenanceResponse } from "../../models/maintenance.interface";

@Injectable({
    providedIn: 'root'
})

export class MaintenanceRrhhService {
    constructor(private http: HttpClient){}

    listMaintenance(title: string, page: number, sizepage: number): Observable<StatusResponse<MaintenanceResponse[]>> {

        let con = page * sizepage;

        let lista: MaintenanceResponse[] = [];

        for (let index = 1; index <= sizepage; index++) {
            let info: MaintenanceResponse = {
                id: 'CAR-HC-0' +  (con + index).toString(),
                description: title + ' 0' +  (con + index).toString(),
                abbreviation: 'PHA' + ' 0' +  (con + index).toString(),
                sizefrom: '1,000,000.00',
                sizeuntil: '12,000,000.00',
                confidential: true
            }
            lista.push(info);
        }
        
        let status: StatusResponse<MaintenanceResponse[]> = {
            success: true,
            data: lista,
            total: 50
        };
        
        return of(status);
    }

    createMaintenance(request: MaintenanceResponse): Observable<StatusResponse<string>> {

        let status: StatusResponse<string> = {
            success: true,
            message: request.title + ' created successfully',
            data: 'CAR-HC-008'
        };
        
        return of(status);
    }

    updateMaintenance(request: MaintenanceResponse): Observable<StatusResponse<string>> {

        let status: StatusResponse<string> = {
            success: true,
            message: request.title + ' updated successfully',
            data: request.id
        };
        
        return of(status);
    }

}