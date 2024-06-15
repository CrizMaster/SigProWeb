import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/pages.routes').then(m => m.PAGES_ROUTES)
    }
];
