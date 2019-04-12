import { Component, OnInit, Input } from '@angular/core';
import {FormGroup, FormBuilder, AbstractControl, Validators, FormControl} from '@angular/forms';
import { UserdatafetcherService } from '../userdatafetcher.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm = new FormGroup({
    userfirstname: new FormControl(),
    userlastname: new FormControl(),
    useremployeeid: new FormControl(),
  }
  );
  userSearch: number;
  users: any;
  @Input() taskuser = {userid:0, userfirstname: '', userlastname: '', useremployeeid: null};
  addupdateButton: String = "Add";


  constructor(/*private formBuilder: FormBuilder,*/ public userDataFetcher:UserdatafetcherService) { }

  ngOnInit() {
  //   this.userForm = this.formBuilder.group({
  //     firstName: ['', Validators.required],
  //     lastName: ['', Validators.required],
  //     empID: ['', Validators.required],
  //     // email: ['', [Validators.required, Validators.email]],
  //     // password: ['', [Validators.required, Validators.minLength(6)]]
  // });
  
  }

  addUser(){
    console.log("in user component.ts" +this.taskuser.userfirstname);
    if (this.taskuser.userfirstname=="" || this.taskuser.userlastname=="" || this.taskuser.useremployeeid==null){
      alert("Input Field should not be blank")
      return;
    }
    if (this.addupdateButton=== "Add")  {
      this.userDataFetcher.addData(this.taskuser).subscribe((param) => this.users=param);
      console.log("users is:" + this.users);
    }
    else{
      this.userDataFetcher.editData(this.taskuser).subscribe((param) => this.users=param);
      console.log("Updated users is:" + this.users);

    }
    
    
    this.addupdateButton = "Add";
  }

  resetUser(){
    this.userForm.reset();
  }

  searchUser(){
    if (this.userSearch==null||isNaN(this.userSearch)){
      alert("Please enter Employee ID")
      return;
    }
    this.userDataFetcher.viewDataByID(this.userSearch).subscribe((param) => {this.users=param;
      console.log("Get Data Param is:"+this.users.userfirstname);
      console.log("param is:" +param);
    if (this.users.errorMessage != null){
      alert (this.users.errorMessage);
      this.users = [];
    }
    });

  }


  editUser(user){
    console.log("User to be edited:" +user.useremployeeid);
    this.taskuser = user;
    this.addupdateButton = "Update";
  }

}
