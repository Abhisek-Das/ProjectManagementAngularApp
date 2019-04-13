import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { ProjectmanagementComponent } from './projectmanagement/projectmanagement.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { MyappRoutingModule } from './myapp-routing/myapp-routing.module';
import { TestrestcomponentComponent } from './testrestcomponent/testrestcomponent.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ProjectmanagementComponent,
    AddProjectComponent,
    AddTaskComponent,
    AddUserComponent,
    ViewTaskComponent,
    TestrestcomponentComponent
  ],
  imports: [
    BrowserModule,
    MyappRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [DatePipe],
  bootstrap: [ProjectmanagementComponent]
})
export class AppModule { }
