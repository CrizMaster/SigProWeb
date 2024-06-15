export interface ProtfolioResponse {
    area?: string,
    project?: string,
    kpi1?: number,
    kpi2?: number,
    kpi3?: number,

    stages1?: string,
    codeStages1?: number,
    stages2?: string,
    codeStages2?: number,
    stages3?: string,
    codeStages3?: number,
    stages4?: string,
    codeStages4?: number,
    stages5?: string,
    codeStages5?: number,
    stages6?: string,
    codeStages6?: number,
    stages?: string
}

export interface ManagerProtfolioResponse {    
    area?: string,
    protfolio?: ProtfolioResponse[]
}