import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './model/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url='http://localhost:3000/user';

  constructor(private http:HttpClient) { }

  postUser(data:User){
   return this.http.post(this.url,data);
  }

  getUser(){
    return this.http.get(this.url)
  }

  deleteUser(id:any){
    return this.http.delete(`${this.url}/${id}`)
  }

  updatedUser(id:any,data:any){
    console.log(`${this.url}/${id}`);
    return this.http.patch(`${this.url}/${id}`,data)
  }

}
