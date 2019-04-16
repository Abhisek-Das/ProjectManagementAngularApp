import { Component, OnInit, Input } from '@angular/core';
import {FormGroup, FormBuilder, AbstractControl, Validators, FormControl} from '@angular/forms';
import { UserdatafetcherService } from '../userdatafetcher.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userSearch: number;
  users: any;
  taskuser = {userid:0, userfirstname: '', userlastname: '', useremployeeid: null};
  addupdateButton: String = "Add";


  constructor(/*private formBuilder: FormBuilder,*/ public userDataFetcher:UserdatafetcherService) { }

  ngOnInit() {
  this.addupdateButton = "Add";
  this.getUsers();
  }

  addUser(){
    // console.log("in user component.ts" +this.taskuser.userfirstname);
    if (this.taskuser.userfirstname=="" || this.taskuser.userlastname=="" || this.taskuser.useremployeeid==null){
      alert("Input Field should not be blank")
      return;
    }
    if (this.addupdateButton=== "Add")  {
      this.userDataFetcher.addData(this.taskuser).subscribe((param) => {this.users=param;
        this.getUsers();
        this.resetUser();
      });
      // console.log("users is:" + this.users);
    }
    else{
      this.userDataFetcher.editData(this.taskuser).subscribe((param) => {this.users=param;
        this.getUsers();
        this.resetUser();
      });
      // console.log("Updated users is:" + this.users);
    }
    
    this.addupdateButton = "Add";
  }

  resetUser(){
    this.getUsers();
    this.taskuser.userfirstname="";
    this.taskuser.userlastname="";
    this.taskuser.useremployeeid="";
  }

  searchUser(){
    if (this.userSearch==null||isNaN(this.userSearch)){
      alert("Please enter valid Employee ID")
      return;
    }
    this.userDataFetcher.viewDataByID(this.userSearch).subscribe((param) => {this.users=param;
      // console.log("Get Data Param is:"+this.users.userfirstname);
      // console.log("param is:" +param);
      // console.log("error msg is:" + this.users.errorMessage);
    if (this.users.errorMessage === "User not found"){
      alert (this.users.errorMessage);
      this.users = [];
    }
    });
    this.userSearch= null;
  }


  editUser(user){
    // console.log("User to be edited:" +user.useremployeeid);
    this.taskuser = user;
    this.addupdateButton = "Update";
  }

  deleteUser(user){
    // console.log("User to be deleted:" +user.useremployeeid);
    // console.log("User id to be deleted:" +user.userid);
    this.userDataFetcher.deleteData(user).subscribe((param) => {this.users=param;
      this.getUsers();
    });
    // console.log("Deleted users is:" + this.users);
    
  }

  getUsers(){
    this.userDataFetcher.getData().subscribe((param)=> {this.users=param;
      if (this.users.errorMessage == "User not found"){
        // console.log("No Users");
        this.users = [];
      }
    });
  }

  sortByFirstName(){
    this.userDataFetcher.sortDataByFirstName().subscribe((param)=> {this.users=param;
      if (this.users.errorMessage == "User not found"){
        // console.log("No Users");
        this.users = [];
      }
    });
  }

  sortByLastName(){
    this.userDataFetcher.sortDataByLastName().subscribe((param)=> {this.users=param;
      if (this.users.errorMessage == "User not found"){
        // console.log("No Users");
        this.users = [];
      }
    });
  }

  sortByID(){
    this.userDataFetcher.sortDataByEmployeeID().subscribe((param)=> {this.users=param;
      if (this.users.errorMessage == "User not found"){
        // console.log("No Users");
        this.users = [];
      }
    });
  }

}
