import { Component, OnInit, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Form } from '@angular/forms';
import { UserService } from '../user.service';
import { customvalidation } from '../validation/custom-validation';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  fromData:FormGroup
  userService:UserService = inject(UserService)

  isShow:boolean=false

  editTheUsername:string
  editTheEmail:string;
  editTheRole:string
  id:string

  updatedUser(data:any){
    this.editTheUsername=data
    this.isShow=true
  }
  updatedEmail(data:any){
    this.editTheEmail=data
  }
  updatedRole(data:any){
    this.editTheRole=data
  }
  newId(id:any){
    this.id=id
  }

  constructor(private fromBuider:FormBuilder) { }


  ngOnInit(): void {
    this.fromData = this.fromBuider.group({
      username:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email,customvalidation.validEmail]),
      roles:new FormControl('User',[]),
    })
  }

  submitData(){
    this.userService.postUser(this.fromData.value).subscribe((res)=>{
      console.log(res);
    })
    window.location.reload()
  }

  EditData(){
    this.userService.updatedUser(this.id,this.fromData.value).subscribe((res)=>{
      return res;
    })
    window.location.reload()
  }

  get usernameValidation() {
    return this.fromData.get('username')
  }

  get emailValidation() {
    return this.fromData.get('email')
  }

}
