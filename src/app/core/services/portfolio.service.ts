import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { StatusResponse } from "../models/status.interface";
import { Injectable } from "@angular/core";
import { ProtfolioResponse } from "../models/protfolio.interface";
import { StatisticsResponse } from "../models/statistics.interface";

@Injectable({
    providedIn: 'root'
})

export class PortfolioService {
    constructor(private http: HttpClient){}


    listStatistics(): Observable<StatusResponse<StatisticsResponse[]>> {

        let lista: StatisticsResponse[] = [];
        lista = [{
            nameStatistics: 'Active Projects',
            valueStatistic: 25,
            valueArrow1: 2,
            valueArrow2: 7,
            image: 'docs'
        },{
            nameStatistics: 'Learned Lessons',
            valueStatistic: 14,
            valueArrow1: 6,
            valueArrow2: 16,
            image: 'lessons'
        },{
            nameStatistics: 'Active Risks',
            valueStatistic: 15,
            valueArrow1: 2.5,
            valueArrow2: 1.3,
            image: 'risks'
        },{
            nameStatistics: 'Tasks',
            valueStatistic: 18,
            valueArrow1: 3,
            valueArrow2: 15,
            image: 'tasks'
        }];
        
        let status: StatusResponse<StatisticsResponse[]> = {
            success: true,
            data: lista,
            total: 12
        };
        
        return of(status);
    }

    listProtfolio(): Observable<StatusResponse<ProtfolioResponse[]>> {
        
        let lista1: ProtfolioResponse[] = [];

        lista1 = [{
            area: 'Area manager 01'
        },{
            project: 'Project 01',
            kpi1: 1,
            kpi2: 1,
            kpi3: 3,
            stages1: 'P-SCOP',
            codeStages1: 1,
            stages2: 'SCOP',
            codeStages2: 8,
            stages3: 'PFS-A',
            codeStages3: 6,
            stages4: 'PFS-B',
            codeStages4: 5,
            stages5: 'FS',
            codeStages5: 3,
            stages6: 'IMP',
            codeStages6: 3,
            area: ''
        },{
            project: 'Project 02',
            kpi1: 1,
            kpi2: 2,
            kpi3: 1,
            stages1: 'P-SCOP',
            codeStages1: 1,
            stages2: 'SCOP',
            codeStages2: 7,
            stages3: 'PFS-A',
            codeStages3: 6,
            stages4: 'PFS-B',
            codeStages4: 6,
            stages5: 'FS',
            codeStages5: 3,
            stages6: 'IMP',
            codeStages6: 3,
            area: ''
        },{
            project: 'Project 03',
            kpi1: 3,
            kpi2: 1,
            kpi3: 1,
            stages1: 'P-SCOP',
            codeStages1: 1,
            stages2: 'SCOP',
            codeStages2: 7,
            stages3: 'PFS-A',
            codeStages3: 5,
            stages4: 'PFS-B',
            codeStages4: 6,
            stages5: 'FS',
            codeStages5: 4,
            stages6: 'IMP',
            codeStages6: 4,
            area: ''
        },{
            area: 'Area manager 02'
        },{
            project: 'Project 01',
            kpi1: 1,
            kpi2: 1,
            kpi3: 3,
            stages1: 'P-SCOP',
            codeStages1: 7,
            stages2: 'SCOP',
            codeStages2: 3,
            stages3: 'PFS-A',
            codeStages3: 2,
            stages4: 'PFS-B',
            codeStages4: 1,
            stages5: 'FS',
            codeStages5: 4,
            stages6: 'IMP',
            codeStages6: 3,
            area: ''
        },{
            project: 'Project 02',
            kpi1: 1,
            kpi2: 2,
            kpi3: 1,
            stages1: 'P-SCOP',
            codeStages1: 2,
            stages2: 'SCOP',
            codeStages2: 2,
            stages3: 'PFS-A',
            codeStages3: 5,
            stages4: 'PFS-B',
            codeStages4: 7,
            stages5: 'FS',
            codeStages5: 4,
            stages6: 'IMP',
            codeStages6: 3,
            area: ''
        },{
            project: 'Project 03',
            kpi1: 3,
            kpi2: 1,
            kpi3: 1,
            stages1: 'P-SCOP',
            codeStages1: 6,
            stages2: 'SCOP',
            codeStages2: 4,
            stages3: 'PFS-A',
            codeStages3: 3,
            stages4: 'PFS-B',
            codeStages4: 2,
            stages5: 'FS',
            codeStages5: 1,
            stages6: 'IMP',
            codeStages6: 5,
            area: ''
        },{
            area: 'Area manager 03'
        },{
            project: 'Project 01',
            kpi1: 1,
            kpi2: 1,
            kpi3: 3,
            stages1: 'P-SCOP',
            codeStages1: 7,
            stages2: 'SCOP',
            codeStages2: 3,
            stages3: 'PFS-A',
            codeStages3: 2,
            stages4: 'PFS-B',
            codeStages4: 1,
            stages5: 'FS',
            codeStages5: 4,
            stages6: 'IMP',
            codeStages6: 3,
            area: ''
        },{
            project: 'Project 02',
            kpi1: 1,
            kpi2: 2,
            kpi3: 1,
            stages1: 'P-SCOP',
            codeStages1: 2,
            stages2: 'SCOP',
            codeStages2: 2,
            stages3: 'PFS-A',
            codeStages3: 5,
            stages4: 'PFS-B',
            codeStages4: 7,
            stages5: 'FS',
            codeStages5: 4,
            stages6: 'IMP',
            codeStages6: 3,
            area: ''
        },{
            project: 'Project 03',
            kpi1: 3,
            kpi2: 1,
            kpi3: 1,
            stages1: 'P-SCOP',
            codeStages1: 6,
            stages2: 'SCOP',
            codeStages2: 4,
            stages3: 'PFS-A',
            codeStages3: 3,
            stages4: 'PFS-B',
            codeStages4: 2,
            stages5: 'FS',
            codeStages5: 1,
            stages6: 'IMP',
            codeStages6: 5,
            area: ''
        }];

        let status: StatusResponse<ProtfolioResponse[]> = {
            success: true,
            data: lista1,
            total: 3
        };
        
        return of(status);
    }

}