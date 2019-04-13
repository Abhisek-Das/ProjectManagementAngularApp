import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map, tap, catchError} from 'rxjs/operators';

const userURL = "http://localhost:8989/api/project";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}; 


@Injectable({
  providedIn: 'root'
})
export class ProjectdatafetcherService {

  constructor(private httpClientObj:HttpClient) { }

  private Data(res:Response){
    let body=res;
    return body || {};
  }

  sortDataByStartDate(){
    return this.httpClientObj.get(userURL + '/sortProjectByStartDate').pipe(
      map(this.Data));
  }

  sortDataByEndDate(){
    return this.httpClientObj.get(userURL + '/sortProjectByEndDate').pipe(
      map(this.Data));
  }

  sortDataByPriority(){
    return this.httpClientObj.get(userURL + '/sortProjectByPriority').pipe(
      map(this.Data));
  }

  sortDataByCompleted(){
    return this.httpClientObj.get(userURL + '/sortProjectByCompleted').pipe(
      map(this.Data));
  }

  getData(){
    return this.httpClientObj.get(userURL + '/viewProjectInfo').pipe(
      map(this.Data));
  }

}
