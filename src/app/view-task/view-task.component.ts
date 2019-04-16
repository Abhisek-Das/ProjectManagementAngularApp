import { Component, OnInit } from '@angular/core';
import { ProjectdatafetcherService } from '../projectdatafetcher.service';
import { TaskdatafetcherService } from '../taskdatafetcher.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  tasklist:any;
  taskcomplete:any = {taskid:0, taskname: '', taskstartdate: '', taskenddate: '', taskpriority: 0, taskstatus: 1, project: '', parenttask: ''};
  projects:any;
  projectname:string = "";
  projectObj:any = [];
  projSelected: any = {projectid:0, projectname: '', projectstartdate:'', projectenddate: '', projectpriority:0};
  post:any;

  constructor(public projectDataFetcher:ProjectdatafetcherService,
              public taskDataFetcher: TaskdatafetcherService) { }

  ngOnInit() {
  }

  getProjects(){
    this.projectDataFetcher.getProjects().subscribe((param)=> {this.projects=param;
      
      if (this.projects.errorMessage == "Project List is empty"){
        // console.log("get Projects error msg:" +this.projects.errorMessage);
        // console.log("No Projects");
        this.projects = [];
      }
    });
  }

  selectProject(){   
    this.tasklist = [];
    // console.log("selected project:"+this.projSelected);
    this.projectObj = this.projSelected;
    this.projectname = this.projSelected.projectname;

    // console.log("this.projectname: " +this.projectname);
    // console.log("Projet ID: " +this.projSelected.projectid);
    this.getTaskByProject();
}

getTaskByProject(){
  // console.log("Project id selected: " +this.projSelected.projectid);
  if (this.projSelected.projectid==0){
    // console.log("No project Selected");
    this.tasklist = [];
  }
  else{
    this.taskDataFetcher.viewTaskByProjectID(this.projSelected.projectid).subscribe((param)=> {
      this.tasklist = param;
      if (this.tasklist.errorMessage == "Task List is empty"){
        // console.log("No Tasks for this project");
        this.tasklist = [];
      }
    })
  }
  
}

sortByStartDate(){

  console.log("Project id selected: " +this.projSelected.projectid);
  if (this.projSelected.projectid==0){
    console.log("No project Selected");
    this.tasklist = [];
  }
  else{
    this.taskDataFetcher.viewTaskSortByStartDate(this.projSelected.projectid).subscribe((param)=> {
      this.tasklist = param;
      if (this.tasklist.errorMessage == "Task List is empty"){
        console.log("No Tasks for this project to sort");
        this.tasklist = [];
      }
    })
  }

}

sortByEndDate(){

  console.log("Project id selected: " +this.projSelected.projectid);
  if (this.projSelected.projectid==0){
    console.log("No project Selected");
    this.tasklist = [];
  }
  else{
    this.taskDataFetcher.viewTaskSortByEndDate(this.projSelected.projectid).subscribe((param)=> {
      this.tasklist = param;
      if (this.tasklist.errorMessage == "Task List is empty"){
        console.log("No Tasks for this project to sort");
        this.tasklist = [];
      }
    })
  }

}

sortByPriority(){

  console.log("Project id selected: " +this.projSelected.projectid);
  if (this.projSelected.projectid==0){
    console.log("No project Selected");
    this.tasklist = [];
  }
  else{
    this.taskDataFetcher.viewTaskSortByPriority(this.projSelected.projectid).subscribe((param)=> {
      this.tasklist = param;
      if (this.tasklist.errorMessage == "Task List is empty"){
        console.log("No Tasks for this project to sort");
        this.tasklist = [];
      }
    })
  }

}

sortByCompleted(){

  console.log("Project id selected: " +this.projSelected.projectid);
  if (this.projSelected.projectid==0){
    console.log("No project Selected");
    this.tasklist = [];
  }
  else{
    this.taskDataFetcher.viewTaskSortByCompleted(this.projSelected.projectid).subscribe((param)=> {
      this.tasklist = param;
      if (this.tasklist.errorMessage == "Task List is empty"){
        console.log("No Tasks for this project to sort");
        this.tasklist = [];
      }
    })
  }

}

endTask(post){
  console.log(post);
  this.taskcomplete = post;

  if (this.taskcomplete.taskstatus == 2){
    alert("This task is already completed");
    return;
  }
  this.taskcomplete.taskstatus = 2;

  this.taskDataFetcher.addTask(this.taskcomplete).subscribe((param)=> {
    alert("This task is marked as complete now");
  })
}

}
