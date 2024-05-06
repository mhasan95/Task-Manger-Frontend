import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tasks } from './tasks';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  private url =  'https://localhost:7085/tasks/';
  constructor(private httpClient: HttpClient) { }
  private totalItems =100;

  getItems(page=1,itemsPerPage=10):Observable<string[]>{
   const startIndex = (page-1)*itemsPerPage;
   const endIndex = startIndex+itemsPerPage;
   const items=[];
   for(let i=startIndex;i<endIndex;i++){
    if(i<this.totalItems){
      items.push(`Item ${i+1}`);
    }
   }
   return of(items).pipe(delay(500));
  }

  getTasks(page:number, size:number){
    return this.httpClient.get('https://localhost:7085/tasks',{
      params: {page,size}
    }).pipe(delay(100));
  }

   createPost(data:any, id:number){
    const headers = { 'content-type': 'application/json'}  
    const postData=JSON.stringify(data);
    console.log(postData,'postData');
    return this.httpClient.post(this.url + id, postData,{'headers':headers})
  }

  createGet(){
    return this.httpClient.get(this.url);
  }
  delete(id:number){
    return this.httpClient.delete(this.url+id);
  }
  update(data:any, id:number){
    const headers = { 'content-type': 'application/json'}  
    const postData=JSON.stringify(data);
    console.log(postData,'pdta');
    return this.httpClient.put(this.url+id,postData, {'headers':headers});
  }
}
