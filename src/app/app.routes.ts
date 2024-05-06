import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path:'login',
        loadComponent: () => import('./login/login.component').then(c=>c.LoginComponent)

    },
    { 
        path:'createtask',
        loadComponent: () => import('./create-task/create-task.component').then(c=>c.CreateTaskComponent)

    },
    { 
        path:'taskmanager',
        loadComponent: () => import('./task-manager/task-manager.component').then(c=>c.TaskManagerComponent)

    },
    { 
        path:'taskdetail',
        loadComponent: () => import('./task-detail/task-detail.component').then(c=>c.TaskDetailComponent)

    },
    {
        path:'',
        loadComponent: () => import('./home/home.component').then(c=>c.HomeComponent)
    }
];
