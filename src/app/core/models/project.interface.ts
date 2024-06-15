export interface ProjectResponse {
    project?: string,
    schedule?: string,
    codeStatusSchedule?: number,
    budget?: string,
    codeStatusBudget?: number,
    risk?: string,
    codeStatusRisk?: number,

    manager?: string,
    summary?: string
}

export interface ManagerProjectResponse {    
    manager?: string,
    totalProject?: number,
    projects?: ProjectResponse[]
}

export interface ProjectGanttResponse {
    id: number,
    nameProject?: string,
    nameTask?: string,
    scheduleHealth?: string,
    porcentajeComp?: number,
    remainingEffort?: number
    tasks?: ProjectGanttResponse[],
    expanded?: false,
    codeScheduleHealth?: number
}

export interface ProjectScheduleResponse {
    fechaInicio?: string,
    fechaFin?: string,
    avance?: number,
    nameStatus?: string,
    codeStatus?: number,
    loading?: boolean
}