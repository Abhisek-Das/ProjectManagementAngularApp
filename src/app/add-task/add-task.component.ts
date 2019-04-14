import { Component, OnInit } from '@angular/core';
import { ProjectdatafetcherService } from '../projectdatafetcher.service';
import { ParenttaskdatafetcherService } from '../parenttaskdatafetcher.service';
import { UserdatafetcherService } from '../userdatafetcher.service';
import { DatePipe } from '@angular/common';
import { TaskdatafetcherService } from '../taskdatafetcher.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  projectname: String = '';
  parenttaskname:string = "";
  projects:any = [];
  userslist:any = []; 
  parentaskslist:any = [];
  project:any = [];
  user: any = [];
  parenttask: any = [];
  theParentTask = true;
  username: String = '';
  taskname:string = '';
  todayDate: any;
  tomorrowDate: any;
  projSelected: any = {projectid:0, projectname: '', projectstartdate:'', projectenddate: '', projectpriority:0};
  task:any = {taskid:0, taskname: '', taskstartdate: '', taskenddate: '', taskpriority: 0, taskstatus: 1, project: '', parenttask: ''};
  parenttaskObj: any = {parentid: 0, parenttask: ""};
  parenttaskSelected: any = {parentid: 0, parenttask: ""};
  taskuserSelected = {userid:0, userfirstname:'', userlastname:'', useremployeeid:0, project:'', task:''};

  constructor(public projectDataFetcher: ProjectdatafetcherService,
              public parenttaskDataFetcher: ParenttaskdatafetcherService,
              public userDataFetcher: UserdatafetcherService,
              public taskDataFetcher: TaskdatafetcherService,
              private datePipe:DatePipe) { }

  ngOnInit() {
    this.theParentTask = true;
    this.todayDate = new Date();
    this.tomorrowDate = new Date();
    this.tomorrowDate.setDate(this.tomorrowDate.getDate()+1);

  }

  toggleVisibility(e){
    this.theParentTask= e.target.checked;

    if (this.theParentTask == true){
      this.projectname = '';
      this.task.taskpriority = 0;
      this.task.taskstatus = 1;
      this.task.taskstartdate = '';
      this.task.taskenddate = '';
      this.username = '';

      alert('You can add only Task name field for the Parent Task');
    }
    else{
      this.task.taskstartdate = this.datePipe.transform(this.todayDate, 'yyyy-MM-dd');
      this.task.taskenddate = this.datePipe.transform(this.tomorrowDate, 'yyyy-MM-dd');
      
    }
  }

  valueChanged(e) {
    console.log("target slider value: " +e);
    // this.rangevalue = e.target.value;
    this.task.taskpriority = e;
  }

  getProjects(){
    this.projectDataFetcher.getProjects().subscribe((param)=> {this.projects=param;
      console.log("get Projects error msg:" +this.projects.errorMessage);
      if (this.projects.errorMessage == "Project List is empty"){
        console.log("No Projects");
        this.projects = [];
      }
    });
  }

  selectProject(){   
      console.log("selected project:"+this.projSelected);
      this.project = this.projSelected;
      this.projectname = this.projSelected.projectname;

      console.log("this.projectname: " +this.projectname);
  }

  getParentTask(){
    this.parenttaskDataFetcher.getParentTasks().subscribe((param)=> {this.parentaskslist=param;
      console.log("get ParentTask error msg:" +this.parentaskslist.errorMessage);
      if (this.parentaskslist.errorMessage == "Parent Task Not Found"){
        console.log("No ParentTask");
        this.parentaskslist = [];
      }
    })
  }

  selectParentTask(){
    console.log("ParentTask Name:" +this.parenttaskSelected);
    console.log("Parent taskname:" +this.parenttaskSelected.parenttask);
    this.parenttaskname = this.parenttaskSelected.parenttask;
    this.parenttask = this.parenttaskSelected;
  }

  getUser(){
    this.userDataFetcher.getData().subscribe((param)=> {this.userslist=param;
      if (this.userslist.errorMessage == "User not found"){
        console.log("No Users");
        this.userslist = [];
      }
    });
  }

  selectUser(){
    this.username = this.taskuserSelected.userfirstname;
    this.user = this.taskuserSelected;
  }

  addTask(){
    if (this.theParentTask == true){
      if (this.taskname == ''){
        alert("Please provide parent task name");
        return;
      }
      else{
        this.parenttaskObj.parenttask = this.taskname;

        this.parenttaskDataFetcher.addParentTasks(this.parenttaskObj).subscribe((param) => {
          console.log("parent task added");
          this.reset();
        });
      }
    }
    else{
      if ( this.projectname == "" || this.taskname == "" || this.parenttaskname == "" || 
           this.task.taskstartdate == "" || this.task.taskenddate == "" || this.username == "" ){
        alert("Please enter all the fields");
        return;
      }
      else{
        this.task.taskname = this.taskname;
        this.task.parenttask = this.parenttaskSelected;
        this.task.project = this.projSelected;

        this.user.task = this.task;
        this.user.project = this.projSelected;

        this.taskDataFetcher.addTask(this.task).subscribe((param) => {
          this.user.task=param;
          console.log("Task Added:"+this.task.taskid);
          this.userDataFetcher.addData(this.user).subscribe((param) => {
            console.log("User added corresponding to task");
            this.reset();
          })
        })
        
      }



    }

  }

  reset(){

      this.projectname = '';
      this.task.taskpriority = 0;
      this.task.taskstatus = 1;
      this.task.taskstartdate = '';
      this.task.taskenddate = '';
      this.username = "";
      this.taskname = "";

  }

}
