import { Component, OnInit, Input } from '@angular/core';
import {FormGroup, FormBuilder, AbstractControl, Validators, FormControl} from '@angular/forms';
import { UserdatafetcherService } from '../userdatafetcher.service';
import { ProjectdatafetcherService } from '../projectdatafetcher.service';
import { DatePipe } from '@angular/common';
import { TaskdatafetcherService } from '../taskdatafetcher.service';


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  todayDate: any;
  tomorrowDate: any;
  buttonText: String = "Add";
  theCheckbox = false;
  users: any;
  projects: any;
  projectmanager: any="";
  projSelected: any= {projectid:0, projectname: '', projectstartdate:'', projectenddate: '', projectpriority:0};
  userSelected:any = {userid:0, userfirstname: '', userlastname: '', useremployeeid: 0, project: '', task: ''};
  proj = {projectid:0, projectname: '', projectstartdate:'', projectenddate: '', projectpriority:0};
  taskuser = {userid:0, userfirstname: '', userlastname: '', useremployeeid: 0, project: '', task: ''};
  

  constructor(public userDataFetcher:UserdatafetcherService, 
              public projectDataFetcher:ProjectdatafetcherService, 
              public taskdatafetcher: TaskdatafetcherService,
              private datePipe:DatePipe) { }

  ngOnInit() {
    // this.todayDate = Date.now();
    // this.tomorrowDate = Date.now();
    // this.tomorrowDate.setDate(this.tomorrowDate.getDate()+1);
    // let formatedStartDate = this.datePipe.transform(this.todayDate, 'dd/mm/yyyy');
    this.todayDate = new Date();
    this.tomorrowDate = new Date();
    this.tomorrowDate.setDate(this.tomorrowDate.getDate()+1);

    this.buttonText = "Add";
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
    // console.log("target slider value: " +e);
    // this.rangevalue = e.target.value;
    this.proj.projectpriority = e;
  }

  getUsers(){
    this.userDataFetcher.getData().subscribe((param)=> {this.users=param;
      if (this.users.errorMessage == "User not found"){
        // console.log("No Users");
        this.users = [];
      }
    });
  }

  selectUser(){
    
    this.taskuser = this.userSelected;
    this.projectmanager = this.userSelected.userfirstname;
    // console.log("USer in select user:" +this.userSelected.userfirstname);
    // console.log("taskuser:" +this.taskuser);

  }

  addProject(){

    // console.log("taskuser in project component: "+ this.taskuser.useremployeeid);
    // console.log("Add project name:" +this.proj.projectname);
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
      // console.log("project added");
      this.resetProject();
      this.getProjects();
    });
    // Needed incase user clicks update and then resets
    // this.getProjects();
    this.buttonText = "Add";

  }

  resetProject(){
    this.proj.projectname = "";
    this.proj.projectstartdate = "";
    this.proj.projectenddate = "";
    this.proj.projectpriority = 0;
    this.projectmanager = "";
    this.theCheckbox = false;
    this.buttonText = "Add";

    this.getProjects();
  }

  getProjects(){
    this.projectDataFetcher.getData().subscribe((param)=> {this.projects=param;
      // console.log("get Projects error msg:" +this.projects.errorMessage);
      if (this.projects.errorMessage == "Project List is empty"){
        // console.log("No Projects");
        this.projects = [];
      }
    });
  }

  sortByEndDate(){
    this.projectDataFetcher.sortDataByEndDate().subscribe((param)=> {this.projects=param;
      if (this.projects.errorMessage == "Project List is empty"){
        // console.log("No Projects");
        this.projects = [];
      }
    });
  }

  sortByPriority(){
    this.projectDataFetcher.sortDataByPriority().subscribe((param)=> {this.projects=param;
      if (this.projects.errorMessage == "Project List is empty"){
        // console.log("No Projects");
        this.projects = [];
      }
    });
  }

  sortByCompleted(){
    this.projectDataFetcher.sortDataByCompleted().subscribe((param)=> {this.projects=param;
      if (this.projects.errorMessage == "Project List is empty"){
        // console.log("No Projects");
        this.projects = [];
      }
    });
  }

  sortByStartDate(){
    this.projectDataFetcher.sortDataByStartDate().subscribe((param)=> {this.projects=param;
      if (this.projects.errorMessage == "Project List is empty"){
        // console.log("No Projects");
        this.projects = [];
      }
    });
  }

  editProject(projectInfo){
    this.proj = projectInfo.project;
    // console.log("Project Name to be edited:" +this.proj.projectname);
    this.taskuser = projectInfo.user;
    if (this.taskuser == null){
      // console.log("No manager selected");
      this.projectmanager = ""
    }
    else{
      this.projectmanager = this.taskuser.userfirstname;
      // console.log("Edit Project username:" +this.taskuser.userfirstname);
    }
    
    this.theCheckbox = true;
    this.buttonText = "Update";
  }

  deleteProject(projectInfo){
    // this.proj = projectInfo.project;
    this.taskuser = projectInfo.user;

    this.userDataFetcher.updateUserByProjectID(projectInfo.project.projectid).subscribe((param)=>{
      // console.log("project delinked from user");
      this.taskdatafetcher.updateTaskByProjectID(projectInfo.project.projectid).subscribe((param)=>{
        // console.log("task deleted for the project");
        this.projectDataFetcher.deleteData(projectInfo.project.projectid).subscribe((param)=>{
          // console.log("project deleted for projectid");
          if(this.taskuser!=null){
            this.taskuser.project=null;
            this.userDataFetcher.addData(this.taskuser).subscribe((param)=>{
              // console.log("projectid set to null in user table");
              this.getProjects();
              this.resetProject();
            })
          }
        })
      })
    })

  }
  
}
