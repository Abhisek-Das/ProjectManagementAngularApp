import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map, tap, catchError} from 'rxjs/operators';


const userURL = "http://localhost:8989/api/user";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};  

@Injectable({
  providedIn: 'root'
})
export class UserdatafetcherService {

  constructor(private httpClientObj:HttpClient) { }

  private Data(res:Response){
    let body=res;
    return body || {};
  }

  addData(postData):Observable<any>{
    console.log("in userdatafetcherservice:" +postData.userfirstname  );
    return this.httpClientObj.post<any>(userURL + '/addUser',JSON.stringify(postData), httpOptions).pipe(
      tap((postData: any)=> console.log('added Data')),
      catchError(this.handleError<any>('addData'))
    );

  }

  viewDataByID(id):Observable<any>{
    console.log("Employee ID:"+id);
    return this.httpClientObj.get(userURL + '/viewUserByEmployeeId/'+id).pipe(
      map(this.Data));
  }

  editData(user){
    console.log("User to be edited" + user.useremployeeid);
    return this.httpClientObj.put<any>(userURL + '/updateUser/' + user.userid, JSON.stringify(user),
          httpOptions).pipe(tap((postData: any)=> console.log('updatedData')),
          catchError(this.handleError<any>('editData'))
    );
  }

  deleteData(user){
    console.log("User to be deleted" + user.userid);
    return this.httpClientObj.delete<any>(userURL + '/deleteUser/' + user.userid, httpOptions).pipe(
      map(this.Data),  
      tap((postData: any)=> console.log('Data deleted')),  
          catchError(this.handleError<any>('deleteData'))
    );
  }

  getData(){
    return this.httpClientObj.get(userURL + '/viewUser').pipe(
      map(this.Data));
  }

  sortDataByFirstName(){
    return this.httpClientObj.get(userURL + '/sortUserByFirstName').pipe(
      map(this.Data));
  }

  sortDataByLastName(){
    return this.httpClientObj.get(userURL + '/sortUserByLastName').pipe(
      map(this.Data));
  }

  sortDataByEmployeeID(){
    return this.httpClientObj.get(userURL + '/sortUserByEmployeeID').pipe(
      map(this.Data));
  }

  //Needed for project data deletion
  updateUserByProjectID(projectid){
    return this.httpClientObj.put<any>(userURL + '/updateUserByProjectid/' + projectid, httpOptions).pipe(  
      tap((postData: any)=> console.log('Project id set to null in user table')),  
          catchError(this.handleError<any>('updateUserByProjectID in user data fetcher'))
    );
  }

  viewDataByTaskID(id):Observable<any>{
    console.log("Task ID:"+id);
    return this.httpClientObj.get(userURL + '/viewUserByTaskId/'+id).pipe(
      map(this.Data));
  }

  viewDataByProjectID(id):Observable<any>{
    console.log("Task ID:"+id);
    return this.httpClientObj.get(userURL + '/viewUserByProjectId/'+id).pipe(
      map(this.Data));
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
