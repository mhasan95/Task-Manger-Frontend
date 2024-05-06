import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import { RequestsService } from '../requests.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, HighchartsChartModule, FormsModule, CommonModule,InfiniteScrollModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public Tasks: any;
  getStatus:any =[];
  statustext:any ='';
  prioritytext:any ='';
  statusColor:string = '';
  priorityColor:string = '';
  oldTask:any;
  date:string='';
   Highcharts: typeof Highcharts = Highcharts;
   chart:any;
   updateFlag: boolean = false;
   chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
    this.chart = chart;
  };
  isLoading=false;
  currentPage=1;
  itemsPerPage=10;
  toggleLoading = ()=>this.isLoading=!this.isLoading;
 
  // loadData = ()=>{
  //   this.toggleLoading();
  //   this.service.getTasks(this.currentPage,this.itemsPerPage).subscribe({
  //     next:response=>this.Tasks = response,
  //     error:err=>console.log(err),
  //     complete:()=>this.toggleLoading()
  //   })
   
  // }
  // loadtext(){
  //   this.Tasks.forEach((Task: { status:number; priority:number; dueDate:Date }) => {
  //           this.date =  new Date(Task.dueDate).toDateString();
  //           this.getStatus.push(Task.status);
  //           this.getStatusText(Task.status);
  //           this.getPriorityText(Task.priority);
  //         });
  //         console.log( this.getStatus ,'date');
  // }

  // appendData = () =>{
  //   this.toggleLoading();
  //   this.service.getItems(this.currentPage,this.itemsPerPage).subscribe({
  //     next:response=>this.Tasks = [...this.Tasks,...response],
  //     error:err=>console.log(err),
  //     complete:()=>this.toggleLoading()
  //   })
  // }

  // onScroll = () =>{
  // this.currentPage++;
  // this.loadtext();
  // this.appendData();
  // }

   chartOptions:Highcharts.Options = {
    chart: {
      type: 'pie',
    },
    plotOptions: {
      area: {
        stacking: 'normal',
      }
    },
    series: [
    {
      type: 'pie',
      data: this.getStatus
    },
  ]}

  priority = [
    {id:1, name:"Low"}, {id:2, name:"Medium"}, {id:3, name:"High"}
  ];
  status = [
    {id:1, name: "pending"}, {id:2, name:'in progress'}, {id:3, name:'completed'}, {id:4, name:'archieved'}
  ];
  constructor(private http:HttpClient, private service:RequestsService){}

  ngOnInit(): void {
    this.fetchTask();
  }
  public  fetchTask(){
    this.http.get('https://localhost:7085/tasks').subscribe((resp:any)=>{
      console.log(resp);
      this.Tasks = resp;
      this.Tasks.forEach((Task: { status:number; priority:number; dueDate:Date }) => {
        this.date =  new Date(Task.dueDate).toDateString();
        this.getStatus.push(Task.status);
        this.getStatusText(Task.status);
        this.getPriorityText(Task.priority);
      });
     
      this.chartOptions.series =  [
          {
            type: 'pie',
            data: this.getStatus
          }
        ]
        this.updateFlag = true;
    })
  }

  getStatusText(status:number){
    if(status == 1){
      this.statustext = 'Pending';
      this.statusColor = '#fddede';
    }
    else if (status == 2){
      this.statustext = 'In Progress';
      this.statusColor = '#fff9c1';
    }
    else if (status == 3 ) {
      this.statustext = 'Completed';
      this.statusColor = '#e8f5ea';
    }
    else if (status == 4){
      this.statustext = 'Archieved';
      this.statusColor = '#deeffd';
    }
  }

  getPriorityText(priority:number){
    if(priority == 1){
      this.prioritytext = 'Low';
      this.priorityColor = '#fddede';
    }
    else if (priority == 2){
      this.prioritytext = 'Medium';
      this.priorityColor = '#fff9c1';
    }
    else if (priority == 3 ) {
      this.prioritytext = 'High';
      this.priorityColor = '#e8f5ea';
    }
    console.log(this.prioritytext,'priority');
  }

  onEdit(taskObj:any){
    this.oldTask =JSON.stringify(taskObj);
      this.Tasks.forEach((task:any) => {
        task.isEdit = false;
      });
    taskObj.isEdit = true;
  }
  onUpdate(taskObj:any){
    const obj ={
      id: taskObj.id,
      title:taskObj.title,
      description:taskObj.description,
      priority:taskObj.priority,
      dueDate:taskObj.dueDate,
      status:taskObj.status
      
    }
    console.log(obj,'obj')
    this.service.update(obj,taskObj.id).subscribe(
      response =>{
        alert('posted');
      },
      error =>{
        console.error("Error creating post", error)
      }
      
    );
  
  }
  onDelete(taskObj:any){
    this.service.delete(taskObj.id).subscribe(
      response =>{
        alert('posted');
      },
      error =>{
        console.error("Error creating post", error)
      }
      
    );
    this.fetchTask();
  }
  onCancel(taskObj:any){
    const setTask = JSON.parse(this.oldTask);
    taskObj.title = setTask.title;
    taskObj.description = setTask.description;
    taskObj.priority = setTask.priority;
    taskObj.dueDate = setTask.dueDate;
    taskObj.status = setTask.status;
    taskObj.isEdit = false;
  }

}
 