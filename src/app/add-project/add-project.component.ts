import { Component, OnInit, Input } from '@angular/core';
import {FormGroup, FormBuilder, AbstractControl, Validators, FormControl} from '@angular/forms';
import { UserdatafetcherService } from '../userdatafetcher.service';
import { ProjectdatafetcherService } from '../projectdatafetcher.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  todayDate: any;
  tomorrowDate: any;
  modeldate = {
    "year": 0,
    "month": 0,
    "day": 0
  };
  theCheckbox = false;
  users: any;
  projects: any;
  projectmanager: any="";
  projSelected: any= {projectid:0, projectname: '', projectstartdate:'', projectenddate: '', projectpriority:0};

  @Input() proj = {projectid:0, projectname: '', projectstartdate:'', projectenddate: '', projectpriority:0};
  @Input() taskuser = {userid:0, userfirstname: '', userlastname: '', useremployeeid: 0, project: '', task: ''};
  

  constructor(public userDataFetcher:UserdatafetcherService, public projectDataFetcher:ProjectdatafetcherService, private datePipe:DatePipe) { }

  ngOnInit() {
    // this.todayDate = Date.now();
    // this.tomorrowDate = Date.now();
    // this.tomorrowDate.setDate(this.tomorrowDate.getDate()+1);
    // let formatedStartDate = this.datePipe.transform(this.todayDate, 'dd/mm/yyyy');
    this.todayDate = new Date();
    this.tomorrowDate = new Date();
    this.tomorrowDate.setDate(this.tomorrowDate.getDate()+1);
    
    console.log("Start Dte:" +this.todayDate );

    this.getProjects();
    
  }

  toggleVisibility(e){
    this.theCheckbox= e.target.checked;

    if (this.theCheckbox == true){
      this.proj.projectstartdate = this.datePipe.transform(this.todayDate, 'yyyy-MM-dd');
      this.proj.projectenddate = this.datePipe.transform(this.tomorrowDate, 'yyyy-MM-dd');
      // alert('button checked');
    }
    else{
      this.proj.projectstartdate = '';
      this.proj.projectenddate = '';
      // alert('button unchecked');
    }
  }

  valueChanged(e) {
    console.log("target slider value: " +e);
    // this.rangevalue = e.target.value;
    this.proj.projectpriority = e;
  }

  getUsers(){
    this.userDataFetcher.getData().subscribe((param)=> {this.users=param;
      if (this.users.errorMessage == "User not found"){
        console.log("No Users");
        this.users = [];
      }
    });
  }

  selectUser(user){
    if (user.userid==null){
      console.log("No manager selected");
    }
    else{
      this.taskuser = user;
      this.projectmanager = user.userfirstname;
      console.log("USer in select user:" +user.userfirstname);
    }
    this.users = [];
  }

  addProject(){

    console.log("taskuser in project component: "+ this.taskuser.useremployeeid);
    console.log("Add project name:" +this.proj.projectname);
    this.projSelected = this.proj;
    this.taskuser.project = this.projSelected;

    if (this.taskuser.project == null){
      alert("Please enter project");
      return;
    }
    if (this.proj.projectstartdate >= this.proj.projectenddate){
      alert("Start Date cannot be greater than End Date");
      return;
    }

    this.userDataFetcher.addData(this.taskuser).subscribe((param) => {
      console.log("project added");
    });

    this.getProjects();

  }

  resetProject(){
    this.proj.projectname = "";
    this.proj.projectstartdate = "";
    this.proj.projectenddate = "";
    this.proj.projectpriority = 0;
  }

  getProjects(){
    this.projectDataFetcher.getData().subscribe((param)=> {this.projects=param;
      console.log("get Projects error msg:" +this.projects.errorMessage);
      if (this.projects.errorMessage == "Project List is empty"){
        console.log("No Projects");
        this.projects = [];
      }
    });
  }

  sortByEndDate(){
    this.projectDataFetcher.sortDataByEndDate().subscribe((param)=> {this.projects=param;
      if (this.projects.errorMessage == "Project List is empty"){
        console.log("No Projects");
        this.projects = [];
      }
    });
  }

  sortByPriority(){
    this.projectDataFetcher.sortDataByPriority().subscribe((param)=> {this.projects=param;
      if (this.projects.errorMessage == "Project List is empty"){
        console.log("No Projects");
        this.projects = [];
      }
    });
  }

  sortByCompleted(){
    this.projectDataFetcher.sortDataByCompleted().subscribe((param)=> {this.projects=param;
      if (this.projects.errorMessage == "Project List is empty"){
        console.log("No Projects");
        this.projects = [];
      }
    });
  }

  sortByStartDate(){
    this.projectDataFetcher.sortDataByStartDate().subscribe((param)=> {this.projects=param;
      if (this.projects.errorMessage == "Project List is empty"){
        console.log("No Projects");
        this.projects = [];
      }
    });
  }

  
}
