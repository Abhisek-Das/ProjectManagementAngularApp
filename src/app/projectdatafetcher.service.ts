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

  deleteData(id){
    return this.httpClientObj.delete(userURL + '/deleteProject/' + id, httpOptions).pipe(
      (map(this.Data),  
      tap((postData: any)=> console.log('Project deleted')),  
          catchError(this.handleError<any>('deleteData in Project')))
    )
  }

  getProjects(){
    return this.httpClientObj.get(userURL + '/viewProject').pipe(
      (map(this.Data),  
      tap((postData: any)=> console.log('Get Project')))
    )
  }


    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      // console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
