import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { RequestsService } from '../requests.service';
import { Tasks } from '../tasks';


@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.css'
})
export class TaskManagerComponent implements OnInit {
  public tasks: any;
  currentTask: any;
  getStatus:string = '';
  date:string='';
  constructor(private http:HttpClient, private service:RequestsService){}

  ngOnInit(): void {
    this.fetchTask();
  }

  // loadTasks(){
  //   this.service.getTasks().subscribe((response: Tasks)=>{
  //     console.log(response,'res');
  //   });
  // }

  public async fetchTask(){
    this.http.get('https://localhost:7085/tasks').subscribe((resp:any)=>{
      this.tasks = resp;
      console.log(this.tasks,'asas');
      this.tasks.forEach((task: { dueDate: any,status:any }) => {
        this.date =  new Date(task.dueDate).toDateString();
        if(task.status == 1){
          this.getStatus = "Pending"; 
        }
        else 
        if(task.status == 2){
          this.getStatus = "In Progress"; 
        }
        else
        if(task.status == 3){
          this.getStatus = "Completed"; 
        }
        else
        if(task.status == 4){
          this.getStatus = "Archieved"; 
        }
      });
    });
  }

  filterTasks(priority:number){
    return this.tasks.filter((m:any)=>m.priority == priority);
  }

  onDragStart(task:any){
    console.log('onDragStart');
  this.currentTask = task;

  }

  onDrop(event:any, priority:number){
    console.log('onDrop');
    const record = this.tasks.find((m:any)=>m.id == this.currentTask.id);
    if(record!=undefined){
      record.priority = priority;
      console.log(record,'record');
      // this.service.update(record,record.id).subscribe((res:any))
      this.service.update(record,record.id).subscribe(
        response =>{
          alert('posted');
        },
        error =>{
          console.error("Error creating post", error);
        })
    }
    this.currentTask = null;
  }

  onDragOver(event:any){
    console.log('onDragOver');
    event.preventDefault();
  }

}
