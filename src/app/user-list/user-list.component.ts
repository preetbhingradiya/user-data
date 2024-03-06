import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../model/user-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userList:User[]
  searchUser:string
  page:number=1;
  count:number=0;
  tableSize:number =10;
  tableSizes:any =[5,10,15,20];

  @Output() EditName:EventEmitter<string>=new EventEmitter<string>();
  @Output() EditEmail:EventEmitter<string>=new EventEmitter<string>();
  @Output() EditRole:EventEmitter<string>=new EventEmitter<string>();
  @Output() id:EventEmitter<string>=new EventEmitter<string>();

  userService:UserService =inject(UserService);
  constructor() { }

  search(value:any){
    this.searchUser=value.value
    this.userService.getUser().subscribe((res:User[])=>{
      let user= res.filter((val)=>val.username.startsWith(this.searchUser))
      this.userList = user
    })
    console.log(this.searchUser);
  }

  searchEmail(value:any){
    this.searchUser=value.value
    this.userService.getUser().subscribe((res:User[])=>{
      let user= res.filter((val)=>val.email.startsWith(this.searchUser))
      this.userList = user
    }) 
  }

  ngOnInit(): void {
    this.allUser()
  }

  allUser(){
    this.userService.getUser().subscribe((res:User[])=>{
      this.userList = res
      return res;
    })
  }

  editUser(data:User){
    this.EditName.emit(data.username)
    this.EditEmail.emit(data.email)
    this.EditRole.emit(data.roles)
    this.id.emit(data.id)
  }

  deleteUser(id:string){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe((res)=>{
          this.ngOnInit()
          return res;
        })
        Swal.fire({
          title: "Deleted!",
          text: "User has been deleted successfull",
          icon: "success"
        });
      }
    });
  }

  onTableDataChange(event:any){
    this.page = event;
    this.allUser()
  }   

  ontableSizeChange(event:any):void{
    this.tableSize = event.target.value;
    this.page =1;
    this.allUser()
  }
}
