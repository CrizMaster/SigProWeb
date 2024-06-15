export interface MaintenanceResponse {
    id?: string,
    description?: string,

    title?: string,

    confidential?: boolean,
    objConfidential?: boolean,
    note?: string,
    objNote?: boolean,
    abbreviation?: string,
    objAbbreviation?: boolean,
    sizefrom?: string,
    sizeuntil?: string,
    objSize?: boolean
}

export interface MaintenanceConfig {
    titleGrid?: string,
    titleBtnAdd?: string
}