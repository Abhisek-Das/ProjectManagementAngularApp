import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map, tap, catchError} from 'rxjs/operators';

const userURL = "http://localhost:8989/api/task";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}; 

@Injectable({
  providedIn: 'root'
})
export class TaskdatafetcherService {

  private Data(res:Response){
    let body=res;
    return body || {};
  }

  constructor(private httpClientObj:HttpClient) { }

  //Needed for project data deletion
  updateTaskByProjectID(projectid){
    return this.httpClientObj.put<any>(userURL + '/updateTaskByProject/' + projectid, httpOptions).pipe(  
      tap((postData: any)=> console.log('Tasks deleted corresponding to the project')),  
          catchError(this.handleError<any>('updateUserByProjectID in user data fetcher'))
    );
  }

  addTask(postData){
    return this.httpClientObj.post<any>(userURL + '/addTask', JSON.stringify(postData), httpOptions).pipe(
      (map(this.Data)),  
      tap((postData: any)=> console.log('Add Task')),
      catchError(this.handleError<any>('addTask'))
    );
  }

  viewTaskByProjectID(projectid){
    return this.httpClientObj.get(userURL + '/viewTaskByProject/' + projectid).pipe(
      map(this.Data)
    );
  }

  viewTaskSortByStartDate(projectid){
    return this.httpClientObj.get(userURL + '/sortTaskByStartDate/' + projectid).pipe(
      map(this.Data)
    );
  }

  viewTaskSortByEndDate(projectid){
    return this.httpClientObj.get(userURL + '/sortTaskByEndDate/' + projectid).pipe(
      map(this.Data)
    );
  }

  viewTaskSortByPriority(projectid){
    return this.httpClientObj.get(userURL + '/sortTaskByPriority/' + projectid).pipe(
      map(this.Data)
    );
  }

  viewTaskSortByCompleted(projectid){
    return this.httpClientObj.get(userURL + '/sortTaskByTaskStatus/' + projectid).pipe(
      map(this.Data)
    );
  }

  viewTaskByTaskID(taskid){
    return this.httpClientObj.get(userURL + '/viewTaskById/' + taskid).pipe(
      map(this.Data)
    );
  }

  updateData(postData){
    console.log("postData.taskid: " + postData.taskid);

    return this.httpClientObj.put<any>(userURL + '/updateTaskByID/' + postData.taskid, JSON.stringify(postData), httpOptions).pipe(
      (map(this.Data)),  
      tap((postData: any)=> console.log('Updated Task')),
      catchError(this.handleError<any>('update Task service'))
    );

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
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}







