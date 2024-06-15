import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DashboardComponent } from "./home/dashboard/dashboard.component";
import { PortfolioComponent } from "./home/portfolio/portfolio.component";
import { ProjectsComponent } from "./home/projects/projects.component";
import { MaintenanceComponent } from "./home/maintenance/maintenance.component";

export const PAGES_ROUTES: Routes = [
    { path: '', component: HomeComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'portfolio', component: PortfolioComponent },
            { path: 'project', component: ProjectsComponent },
            { path: 'maintenance', component: MaintenanceComponent }
        ]
     }    
]