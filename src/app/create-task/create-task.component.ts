import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RequestsService } from '../requests.service';
import {  HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
  showForm = true;
  id:number = 10;
  isodate:Date = new Date();
  priority = [
    {id:1, name:"Low"}, {id:2, name:"Medium"}, {id:3, name:"High"}
  ];
  status = [
    {id:1, name: "pending"}, {id:2, name:'in progress'}, {id:3, name:'completed'}, {id:4, name:'archieved'}
  ];
  constructor(private fb: FormBuilder, private service:RequestsService){}

  form:FormGroup = this.fb.group({
    id: this.id + 2,
    title: [''],
    description: [''],
    priority: [''],
    dueDate: [''],
    status: ['']
  })
  postData = {
    id:this.id +2, title:'', description:'', priority:'', dueDate:'', status:''
  };

  postTask(){
    this.isodate = new Date (this.postData.dueDate);
    console.log(this.isodate,'isodate');
    this.service.createPost(this.postData, this.postData.id+1).subscribe(
      response =>{
        console.log(this.postData,'form');
        alert('posted');
      },
      error =>{
        console.error("Error creating post", error)
      }
      
    );
  }
}
