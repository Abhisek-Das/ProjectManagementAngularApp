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
    return this.httpClientObj.put<any>(userURL + '/updateUser/' + user.useremployeeid, JSON.stringify(user),
          httpOptions).pipe(tap((postData: any)=> console.log('updatedData')),
          catchError(this.handleError<any>('editData'))
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
