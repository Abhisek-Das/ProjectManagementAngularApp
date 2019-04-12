import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projectmanagement',
  templateUrl: './projectmanagement.component.html',
  styleUrls: ['./projectmanagement.component.css']
})
export class ProjectmanagementComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  addproject(){
    this.router.navigate(['/addproject']);
  }

  addtask(){
    this.router.navigate(['/addtask']);
  }

  adduser(){
    this.router.navigate(['/adduser']);
  }

  viewtask(){
    this.router.navigate(['/viewtask']);
  }

}
