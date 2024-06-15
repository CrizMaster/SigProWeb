import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { StatusResponse } from "../../models/status.interface";
import { StatisticsResponse } from "../../models/statistics.interface";
import { DeliverablesResponse } from "../../models/deliverables.interface";

@Injectable({
    providedIn: 'root'
})

export class OverviewService {
    constructor(private http: HttpClient){}


    listStatistics(): Observable<StatusResponse<StatisticsResponse[]>> {

        let lista: StatisticsResponse[] = [];
        lista = [{
            nameStatistics: 'Risks',
            valueStatistic: 5,
            valueArrow1: 2.5,
            valueArrow2: 1.3,
            image: 'risks'
        },{
            nameStatistics: 'Tasks',
            valueStatistic: 18,
            valueArrow1: 27,
            valueArrow2: 18,
            image: 'tasks'
        },{
            nameStatistics: 'Docs',
            valueStatistic: 9,
            valueArrow1: 16,
            valueArrow2: 9,
            image: 'docs'
        },{
            nameStatistics: 'Lessons',
            valueStatistic: 2,
            valueArrow1: 0,
            valueArrow2: 2,
            image: 'lessons'
        }];
        
        let status: StatusResponse<StatisticsResponse[]> = {
            success: true,
            data: lista,
            total: 4
        };
        
        return of(status);
    }

    listDeliverables(): Observable<StatusResponse<DeliverablesResponse[]>> {

        let lista: DeliverablesResponse[] = [{
            nameDeliverable: 'SOR',
            codeStatus: 1
          },{
            nameDeliverable: 'PIF',
            codeStatus: 1
          },{
            nameDeliverable: 'PCH',
            codeStatus: 1
          },{
            nameDeliverable: 'SIP',
            codeStatus: 2
          },{
            nameDeliverable: 'KOM',
            codeStatus: 2
          },{
            nameDeliverable: 'SOW',
            codeStatus: 2
          },{
            nameDeliverable: 'STUDY MATRIX',
            codeStatus: 2
          },{
            nameDeliverable: 'PERMISS MATRIX',
            codeStatus: 1
          },{
            nameDeliverable: 'SUPPLY MATRIX',
            codeStatus: 1
          },{
            nameDeliverable: 'FACIL. MATRIX',
            codeStatus: 2
          },{
            nameDeliverable: 'STUDIES MATRIX',
            codeStatus: 3
          },{
            nameDeliverable: 'MTO',
            codeStatus: 3
          },{
            nameDeliverable: 'FACILITIES & DELIVERABLES',
            codeStatus: 1
          },{
            nameDeliverable: 'PES',
            codeStatus: 3
          },{
            nameDeliverable: 'PEP',
            codeStatus: 1
          },{
            nameDeliverable: 'BCV',
            codeStatus: 1
          },{
            nameDeliverable: 'VIPS-CONSTRUCTABILITY',
            codeStatus: 3
          },{
            nameDeliverable: 'PLAN DE CONTRATACIONES',
            codeStatus: 3
          },{
            nameDeliverable: 'ICP',
            codeStatus: 2
          }];
        
        let status: StatusResponse<DeliverablesResponse[]> = {
            success: true,
            data: lista,
            total: 4
        };
        
        return of(status);
    }

}