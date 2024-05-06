import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { RequestsService } from '../requests.service';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [InfiniteScrollModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent implements OnInit {
  items:string[] =[];
  isLoading=false;
  currentPage=1;
  itemsPerPage=10;
  toggleLoading = ()=>this.isLoading=!this.isLoading;

  loadData = ()=>{
    this.toggleLoading();
    this.paginationService.getItems(this.currentPage,this.itemsPerPage).subscribe({
      next:response=>this.items = response,
      error:err=>console.log(err),
      complete:()=>this.toggleLoading()
    })
  }
ngOnInit(): void {
  this.loadData();
}
appendData = () =>{
  this.toggleLoading();
  this.paginationService.getItems(this.currentPage,this.itemsPerPage).subscribe({
    next:response=>this.items = [...this.items,...response],
    error:err=>console.log(err),
    complete:()=>this.toggleLoading()
  })
}
onScroll = () =>{
this.currentPage++;
this.appendData();
}

constructor(private paginationService:RequestsService){}
}
