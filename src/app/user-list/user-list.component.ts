import { Component, OnInit, inject } from '@angular/core';
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

  userService:UserService =inject(UserService);
  constructor() { }

  search(value:any){
    this.searchUser=value.value
    this.userService.getUser().subscribe((res:User[])=>{
      let user= res.filter((val)=>val.username.startsWith(this.searchUser))
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
    Swal.fire({
      title: "Submit your Github username",
      input: "text",
      inputValue:`${data.username}`,
      showCancelButton: true,
      confirmButtonText: "updated",
      showLoaderOnConfirm: true,
      preConfirm: async (login) => {
        try {
         this.userService.updatedUser(data.id,{...data}).subscribe((res)=>{     
          this.allUser()
          return res
         })
          console.log(data.id);
        } catch (error) {
          Swal.showValidationMessage(`
            Request failed: ${error}
          `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  deleteUser(id:string){
    this.userService.deleteUser(id).subscribe((res)=>{
      this.ngOnInit()
      return res;
    })
    // console.log(id);
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
