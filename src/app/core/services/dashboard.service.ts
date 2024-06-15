import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { StatusResponse } from "../models/status.interface";
import { Injectable } from "@angular/core";
import { ProjectResponse, ManagerProjectResponse, ProjectGanttResponse } from "../models/project.interface";

@Injectable({
    providedIn: 'root'
})

export class DashboardService {
    constructor(private http: HttpClient){}


    listProject(): Observable<StatusResponse<ProjectResponse[]>> {

        let lista: ProjectResponse[] = [];
        lista = [{
            project: 'Project Management Workplan',
            schedule: 'Green',
            codeStatusSchedule: 1,
            budget: 'Yellow',
            codeStatusBudget: 2,
            risk: 'Yellow',
            codeStatusRisk : 2
        },{
            project: 'HR System Implementation',
            schedule: 'Green',
            codeStatusSchedule: 1,
            budget: 'Green',
            codeStatusBudget: 1,
            risk: 'Yellow',
            codeStatusRisk : 2
        },{
            project: 'Software Development',
            schedule: 'Green',
            codeStatusSchedule: 1,
            budget: 'Red',
            codeStatusBudget: 3,
            risk: 'Yellow',
            codeStatusRisk : 2
        },{
            project: 'MS Sharepoint deployment',
            schedule: 'Green',
            codeStatusSchedule: 1,
            budget: 'Red',
            codeStatusBudget: 3,
            risk: 'Green',
            codeStatusRisk : 1
        },{
            project: 'Marketing Event',
            schedule: 'Green',
            codeStatusSchedule: 1,
            budget: 'Green',
            codeStatusBudget: 1,
            risk: 'Green',
            codeStatusRisk : 1
        },{
            project: 'Renovation Plan',
            schedule: 'Yellow',
            codeStatusSchedule: 2,
            budget: 'Green',
            codeStatusBudget: 1,
            risk: 'Red',
            codeStatusRisk : 3
        },{
            project: 'Website Design',
            schedule: 'Red',
            codeStatusSchedule: 3,
            budget: 'Green',
            codeStatusBudget: 1,
            risk: 'Red',
            codeStatusRisk : 3
        },{
            project: 'New Product Development Schedule',
            schedule: 'Yellow',
            codeStatusSchedule: 2,
            budget: 'Yellow',
            codeStatusBudget: 2,
            risk: 'Yellow',
            codeStatusRisk : 2
        },{
            project: 'Marketing Event',
            schedule: 'Green',
            codeStatusSchedule: 1,
            budget: 'Green',
            codeStatusBudget: 1,
            risk: 'Green',
            codeStatusRisk : 1
        },{
            project: 'Renovation Plan',
            schedule: 'Yellow',
            codeStatusSchedule: 2,
            budget: 'Green',
            codeStatusBudget: 1,
            risk: 'Red',
            codeStatusRisk : 3
        },{
            project: 'Website Design',
            schedule: 'Red',
            codeStatusSchedule: 3,
            budget: 'Green',
            codeStatusBudget: 1,
            risk: 'Red',
            codeStatusRisk : 3
        },{
            project: 'New Product Development Schedule',
            schedule: 'Yellow',
            codeStatusSchedule: 2,
            budget: 'Yellow',
            codeStatusBudget: 2,
            risk: 'Yellow',
            codeStatusRisk : 2
        }];
        
        let status: StatusResponse<ProjectResponse[]> = {
            success: true,
            data: lista,
            total: 12
        };
        
        return of(status);
    }

    listStatusProject(): Observable<StatusResponse<ManagerProjectResponse[]>> {
        
        let lista1: ProjectResponse[] = [];
        let lista2: ProjectResponse[] = [];

        lista1 = [{
            project: 'Project Management Workplan',
            schedule: 'Green',
            codeStatusSchedule: 1,
            budget: 'Yellow',
            codeStatusBudget: 2,
            risk: 'Yellow',
            codeStatusRisk : 2,
            manager: '',
            summary: 'Chance of delay by a day since required IC is not in stock. The new version sots Rs.6000 more'
        },{
            project: 'HR System Implementation',
            schedule: 'Green',
            codeStatusSchedule: 1,
            budget: 'Green',
            codeStatusBudget: 1,
            risk: 'Yellow',
            codeStatusRisk : 2,
            manager: '',
            summary: 'Need to get additional budget approved to cope up with the change requests'
        },{
            project: 'Software Development',
            schedule: 'Green',
            codeStatusSchedule: 1,
            budget: 'Red',
            codeStatusBudget: 3,
            risk: 'Yellow',
            codeStatusRisk : 2,
            manager: '',
            summary: 'Need to get additional budget approved to cope up with the change requests'
        },{
            project: 'MS Sharepoint deployment',
            schedule: 'Green',
            codeStatusSchedule: 1,
            budget: 'Red',
            codeStatusBudget: 3,
            risk: 'Green',
            codeStatusRisk : 1,
            manager: '',
            summary: 'Project is on schedule but an unexpected issue effected the budget by 500$'
        }];

        lista2 = [{
            project: 'Marketing Event',
            schedule: 'Green',
            codeStatusSchedule: 1,
            budget: 'Green',
            codeStatusBudget: 1,
            risk: 'Green',
            codeStatusRisk : 1,
            manager: '',
            summary: 'Project is on schedule but an unexpected issue effected the budget by 500$'
        },{
            project: 'Renovation Plan',
            schedule: 'Yellow',
            codeStatusSchedule: 2,
            budget: 'Green',
            codeStatusBudget: 1,
            risk: 'Red',
            codeStatusRisk : 3,
            manager: '',
            summary: 'Need to get additional budget approved to cope up with the change requests'
        },{
            project: 'Website Design',
            schedule: 'Red',
            codeStatusSchedule: 3,
            budget: 'Green',
            codeStatusBudget: 1,
            risk: 'Red',
            codeStatusRisk : 3,
            manager: '',
            summary: 'Chance of delay by a day since required IC is not in stock. The new version sots Rs.6000 more'
        }];
        
        let list: ManagerProjectResponse[] = [{
            manager: 'Andrew Brooks',
            projects: lista1
        },{
            manager: 'Ajay Singh',
            projects: lista2
        }];

        let status: StatusResponse<ManagerProjectResponse[]> = {
            success: true,
            data: list,
            total: 2
        };
        
        return of(status);
    }

    listProjectsGantt(): Observable<StatusResponse<ProjectGanttResponse[]>> {
        
        let lista: ProjectGanttResponse[] = [];

        lista = [{
            id: 1,
            nameProject: 'Project Management Workplan',
            expanded: false,            
            tasks: [{
                id: 1,
                nameTask: 'Tarea de resumen 1',
                scheduleHealth: 'Completed',
                codeScheduleHealth: 4,
                porcentajeComp: 100,
                remainingEffort: 0.00
            },{
                id: 2,
                nameTask: 'Tarea de resumen 2',
                scheduleHealth: 'Completed',
                codeScheduleHealth: 4,
                porcentajeComp: 100,
                remainingEffort: 0.00
            },{
                id: 3,
                nameTask: 'Tarea de resumen 3',
                scheduleHealth: 'Off Track',
                codeScheduleHealth: 3,
                porcentajeComp: 27,
                remainingEffort: 0.00
            }]
        },{
            id: 4,
            nameProject: 'HR System Implementation',
            expanded: false,
            tasks: [{
                id: 5,
                nameTask: 'Tarea de resumen 1',
                scheduleHealth: 'Completed',
                codeScheduleHealth: 4,
                porcentajeComp: 100,
                remainingEffort: 0.00
            },{
                id: 6,
                nameTask: 'Tarea de resumen 2',
                scheduleHealth: 'Completed',
                codeScheduleHealth: 4,
                porcentajeComp: 100,
                remainingEffort: 0.00
            },{
                id: 7,
                nameTask: 'Tarea de resumen 3',
                scheduleHealth: 'Off Track',
                codeScheduleHealth: 3,
                porcentajeComp: 27,
                remainingEffort: 0.00
            }]
        },{
            id: 8,
            nameProject: 'Software Development',
            expanded: false,
            tasks: [{
                id: 9,
                nameTask: 'Tarea de resumen 1',
                scheduleHealth: 'Completed',
                codeScheduleHealth: 4,
                porcentajeComp: 100,
                remainingEffort: 0.00
            },{
                id: 10,
                nameTask: 'Tarea de resumen 2',
                scheduleHealth: 'Completed',
                codeScheduleHealth: 4,
                porcentajeComp: 100,
                remainingEffort: 0.00
            },{
                id: 11,
                nameTask: 'Tarea de resumen 3',
                scheduleHealth: 'Off Track',
                codeScheduleHealth: 4,
                porcentajeComp: 27,
                remainingEffort: 0.00
            }]
        },{
            id: 12,
            nameProject: 'MS Sharepoint deployment',
            expanded: false,
            tasks: [{
                id: 13,
                nameTask: 'Tarea de resumen 1',
                scheduleHealth: 'Completed',
                codeScheduleHealth: 4,
                porcentajeComp: 100,
                remainingEffort: 0.00
            },{
                id: 14,
                nameTask: 'Tarea de resumen 2',
                scheduleHealth: 'Completed',
                codeScheduleHealth: 4,
                porcentajeComp: 100,
                remainingEffort: 0.00
            },{
                id: 15,
                nameTask: 'Tarea de resumen 3',
                scheduleHealth: 'Off Track',
                codeScheduleHealth: 3,
                porcentajeComp: 27,
                remainingEffort: 0.00
            }]
        }];

        let status: StatusResponse<ProjectGanttResponse[]> = {
            success: true,
            data: lista,
            total: 2
        };
        
        return of(status);
    }
}