import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { LoginComponent } from './login/login.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterOutlet, CreateTaskComponent,TaskManagerComponent, LoginComponent, TaskDetailComponent],
 templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Task-App-Frontend';
}
