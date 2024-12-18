import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { RestaurentData } from '../dashboard/restaurent.model';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
   addRestaurent(restaurentModelObj : RestaurentData){
     return this.postRestaurent(RestaurentData);
   }
  constructor(private _http : HttpClient) { }
  
  // to add data into server
  postRestaurent(data:any){
    return this._http.post<any>("http://localhost:3000/posts",data).pipe(map((res:any)=>{
      return res;
    }));
  }

  //to fetch the data from server
   getRestaurent(){
    return this._http.get<any>("http://localhost:3000/posts").pipe(map((res:any)=>{
      return res;
    }));
   }

   deleteRestaurent(id:number){
    return this._http.delete<any>("http://localhost:3000/posts/"+id).pipe(map((res:any)=>{
      return res;
    }));
   }

   
   //update Restaurent
   updateRestaurent(id:number,data:any){
    return this._http.put<any>("http://localhost:3000/posts/"+id,data).pipe(map((res:any)=>{
      return res;
    }));
   }
}
