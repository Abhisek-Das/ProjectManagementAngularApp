import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map, tap, catchError} from 'rxjs/operators';

const userURL = "http://localhost:8989/api/parenttask";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}; 

@Injectable({
  providedIn: 'root'
})
export class ParenttaskdatafetcherService {

  constructor(private httpClientObj:HttpClient) { }

  private Data(res:Response){
    let body=res;
    return body || {};
  }

  getParentTasks(){
    return this.httpClientObj.get(userURL + '/viewParentTask').pipe(
      (map(this.Data),  
      tap((postData: any)=> console.log('Get Parent Task'))
    ))
  }

  addParentTasks(postData){
    return this.httpClientObj.post<any>(userURL + '/addParentTask', JSON.stringify(postData), httpOptions).pipe(
      (map(this.Data)),  
      tap((postData: any)=> console.log('Add Parent Task')),
      catchError(this.handleError<any>('addParentTasks'))
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
    // console.error(error); // log to console instead
 
    // TODO: better job of transforming error for user consumption
    // console.log(`${operation} failed: ${error.message}`);
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}


}
