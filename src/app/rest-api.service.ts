import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { catchError, tap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',                          
      'Access-Control-Allow-Origin': '*' })
};

const apiUrl = "https://jsonplaceholder.typicode.com/todos/1"
      /*"http://gssnte811.asia.ad.flextronics.com:4042/api/DashBoardApi/GetDashboardDetails/?todaysdate=11-23-2018&location=Chennai&employeeID=941364";*//*;*/

interface mydata
    {
        obj: Object;
    }

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }
    
 /*   private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError('Something bad happened; please try again later.');
}

private extractData(res: Response) {
  let body = res;
  return body || { };
}*/
    getData(): Observable<any>{
    
return this.http.get<mydata>(apiUrl)
  /*.then(data => {

    console.log(data.status);
    console.log(data.data); // data received by server
    console.log(data.headers);

  })
  .catch(error => {

    console.log(error.status);
    console.log(error.error); // error message as string
    console.log(error.headers);

  });*/
   /*return response1;*/
}
/* getData(): Observable<any> {
let response1 = this.http.get(apiUrl+"todaysdate=11-23-2018&location=Chennai&employeeID=941364");
        return response1;*/
  /*let response2= this.http.get(apiUrl+'IN/110001');
  let response3 = this.http.get(apiUrl+'BR/01000-000');
  let response4 = this.http.get(apiUrl+'FR/01000');*/
  //return forkJoin([response1, response2, response3, response4]);  
/*     
}*/
    /*getClassroomById(id: string): Observable<any> {
  const url = `${apiUrl}/${id}`;
  return this.http.get(url, httpOptions).pipe(
    map(this.extractData),
    catchError(this.handleError));
}*/
}
