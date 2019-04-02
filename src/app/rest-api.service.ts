import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { catchError, tap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import {formatDate } from '@angular/common';
import { Globals } from './global';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'text/xml'}).set('Accept', 'text/xml')
};

//const apiUrl = "http://gssnte811.asia.ad.flextronics.com:4042/api/DashBoardApi/GetDashboardDetails/?";
/*"assets/myjson.json"; todaysdate=11-23-2018&location=Chennai&employeeID=941364
"https://jsonplaceholder.typicode.com/todos/1";*/

const SITserver="http://gssnte811.asia.ad.flextronics.com:4042/";
const testserver="https://testmobile.flextronics.com/goeasyapi";
//const prodserver="http://sacnt2315.americas.ad.flextronics.com/goeasyapi";
const prodserver="https://mobileservice.flex.com/goeasyapi";
const CIPProdserver="http://hkdnt955.asia.ad.flextronics.com:94";

/****   Goeasy SIT Server ***********
const LoginURL="http://gssnte811.asia.ad.flextronics.com:4042/api/login/CheckLoginDetailEncryption?";
const DashboardUrl = "http://gssnte811.asia.ad.flextronics.com:4042/api/DashBoardApi/GetDashboardDetails/?";
const MytripsURL="http://gssnte811.asia.ad.flextronics.com:4042/api/MyTripsApi/GetMyTripsDetails?";
const SaveNoShowURL="http://gssnte811.asia.ad.flextronics.com:4042/api/CancelTransportRequestApi/SaveCancelRequests?";
const MyApprovalURL="http://gssnte811.asia.ad.flextronics.com:4042/api/CabApprovalApi/ReadPendingRequests/?";
const SaveMyApprovalURL="http://gssnte811.asia.ad.flextronics.com:4042/api/cabapprovalapi/ApprovePendingRequests?";
const AdhocRequestURL="http://gssnte811.asia.ad.flextronics.com:4042/api/AdhocCabRequestApi/ReadAdhocCabRequestValues/?";
const SaveAdhocRequestURL="http://gssnte811.asia.ad.flextronics.com:4042/api/AdhocCabRequestApi/SaveCabOperationDetails?";
const FeedbackURL="http://gssnte811.asia.ad.flextronics.com:4042/api/FeedbackApi/GetMobileQuestions?";
const SaveFeedbackURL="http://gssnte811.asia.ad.flextronics.com:4042/api/FeedbackApi/SaveMobileFeedback?";
const MyApprovalCIPURL="http://gssnte811.asia.ad.flextronics.com:4042/api/SpecialCabRequestApi/GetSpecialCabDetails/?";
const SaveMyApprovalCIPURL="http://gssnte811.asia.ad.flextronics.com:4042/api/SpecialCabRequestApi/SaveApproveRejectData/?";*/

/****   Goeasy Testing Server --f5 enabled URL https://testmobile.flextronics.com/goeasyapi/   *****/
const LoginURL=prodserver+"/api/login/CheckLoginDetailEncryption?";
const DashboardUrl = prodserver+"/api/DashBoardApi/GetDashboardDetails/?";
const MytripsURL=prodserver+"/api/MyTripsApi/GetMyTripsDetails?";
const SaveNoShowURL=prodserver+"/api/CancelTransportRequestApi/SaveCancelRequests?";
const MyApprovalURL=prodserver+"/api/CabApprovalApi/ReadPendingRequests/?";
const SaveMyApprovalURL=prodserver+"/api/cabapprovalapi/ApprovePendingRequests?";
const AdhocRequestURL=prodserver+"/api/AdhocCabRequestApi/ReadAdhocCabRequestValues/?";
const SaveAdhocRequestURL=prodserver+"/api/AdhocCabRequestApi/SaveCabOperationDetails?";
const FeedbackURL=prodserver+"/api/FeedbackApi/GetMobileQuestions?";
const SaveFeedbackURL=prodserver+"/api/FeedbackApi/SaveMobileFeedback?";
const MyApprovalCIPURL=CIPProdserver+"/api/SpecialCabRequestApi/GetSpecialCabDetails/?";
const SaveMyApprovalCIPURL=CIPProdserver+"/api/SpecialCabRequestApi/SaveApproveRejectData/?";

interface mydata
    {
        obj: Object;
    }

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  dbdate='';
  today= new Date();
  
  constructor(private http: HttpClient,public globals: Globals) {
    this.dbdate = formatDate(this.today, 'MM-dd-yyyy', 'en-US', '+0530')
   }
    
  private handleError(error: HttpErrorResponse) {
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
 /* 
private extractData(res: Response) {
  let body = res;
  return body || { };
}*/

getLoginData(username: string, password: string): Observable<any>{
  let params = new HttpParams()
   .set('username', username)
   .set('password', password);
return this.http.get<mydata>(LoginURL,{params}).pipe(catchError(this.handleError));
}

    getDashboardData(): Observable<any>{
     let params = new HttpParams()
      .set('todaysdate', this.dbdate)
      .set('employeeID',localStorage.getItem('EmployeeID'))
      .set('location', localStorage.getItem('LocationName'));//localStorage.getItem('EmployeeID') '930730'
return this.http.get<mydata>(DashboardUrl,{params}).pipe(catchError(this.handleError));
  }
  getMyTripsData(): Observable<any>{
    let params = new HttpParams()
     .set('todaydate', this.dbdate)
     .set('employeeID', localStorage.getItem('EmployeeID'));
  return this.http.get<mydata>(MytripsURL,{params}).pipe(catchError(this.handleError));
  }

  saveCancelTrips(RequestTypeName:string,RequestForName:string,ShiftTimeID:string,
    CabRequestID:string,FromDateOpnNoShow:string,ToDateOpnNoShow:string,
    RequestTypeID:string,RequestForID:string,RequestedForName:string,ShiftTimeName:string,
    locationID:string,employeeID:string,UserTime:string): Observable<any>{
    let params = new HttpParams()
     .set('RequestTypeName', RequestTypeName)
     .set('RequestForName', RequestForName)
     .set('ShiftTimeID', ShiftTimeID)
     .set('CabRequestID', CabRequestID)
     .set('FromDateOpnNoShow', FromDateOpnNoShow)
     .set('ToDateOpnNoShow', ToDateOpnNoShow)
     .set('RequestTypeID', RequestTypeID)
     .set('RequestForID', RequestForID)
     .set('RequestedForName', RequestedForName)
     .set('ShiftTimeName', ShiftTimeName)
     .set('locationID', locationID)
     .set('employeeID', employeeID)
     .set('UserTime', UserTime);
  return this.http.get<mydata>(SaveNoShowURL,{params}).pipe(catchError(this.handleError));
  }

  getMyApprovalData(): Observable<any>{
    let params = new HttpParams()
     .set('status', '1')
     .set('loggedUser',localStorage.getItem('EmployeeID'));//'880781'
  return this.http.get<mydata>(MyApprovalURL,{params}).pipe(catchError(this.handleError));
  }
  saveMyApproval(cabRequestID:string,remarks:string,status:string,approver:string): Observable<any>{
    let params = new HttpParams()
     .set('cabRequestID', cabRequestID)
     .set('remarks', remarks)
     .set('status', status)
     .set('approver', approver);
  return this.http.get<mydata>(SaveMyApprovalURL,{params}).pipe(catchError(this.handleError));
  }
  getMyApprovalCIPData(): Observable<any>{
    let params = new HttpParams()
     .set('viewId', '2')
     .set('employeeID',localStorage.getItem('EmployeeID'))
     .set('locationName',localStorage.getItem('LocationName'))
     .set('employeeName',localStorage.getItem('displayname'));//'880781'localStorage.getItem('EmployeeID')
  return this.http.get<mydata>(MyApprovalCIPURL,{params}).pipe(catchError(this.handleError));
  }
  saveMyApprovalCIP(cabRequestID:string,remarks:string,status:string,approver:string): Observable<any>{
    let params = new HttpParams()
     .set('SpecialCabRequestID', cabRequestID)
     .set('Remarks', remarks)
     .set('StatusID', status)
     .set('RequestForEmployeeName', '')
     .set('FromDate', '')
     .set('ToDate', '')
     .set('NoOfPersons', '')
     .set('VerticalName', '')
     .set('StatusName', '')
     .set('ApproverMailID', '')
     .set('userMailID', '')
     .set('ApprovedBy', approver);
  return this.http.get<mydata>(SaveMyApprovalCIPURL,{params}).pipe(catchError(this.handleError));
  }
  getAdhocrequestData(): Observable<any>{
    let params = new HttpParams()
     .set('employeeID', localStorage.getItem('EmployeeID'))
     .set('locationID',localStorage.getItem('LocationID'));//'880781'localStorage.getItem('EmployeeID')
  return this.http.get<mydata>(AdhocRequestURL,{params}).pipe(catchError(this.handleError));
  }
  saveAdhocrequest(RequestTypeID:string,RequestTypeName:string,RequestForID:string,
    RequestForName:string,SpecialNeed:string,FromDate:string,ToDate:string,Shift:string,
    ShiftTimeName:string,AreaID:string,AreaName:string,BoardingPointID:string,BoardingPointName:string,
    SpecialNeedReason:string,Reason:string,UserTime:string,CommonDate:string): Observable<any>{
    let params = new HttpParams()
     .set('LocationID', localStorage.getItem('LocationID'))
     .set('EmployeeID',  localStorage.getItem('EmployeeID'))
     .set('RequestTypeID', RequestTypeID)
     .set('RequestTypeName', RequestTypeName)
     .set('RequestForID', RequestForID)
     .set('RequestForName', RequestForName)
     .set('FromDate', FromDate)
     .set('ToDate', ToDate)
     .set('CommonDate', CommonDate)
     .set('UserTime', UserTime)
     .set('Shift', Shift)
     .set('ShiftTimeName', ShiftTimeName)
     .set('AreaID', AreaID)
     .set('AreaName', AreaName)
     .set('BoardingPointID', BoardingPointID)
     .set('BoardingPointName', BoardingPointName)
     .set('SpecialNeed', SpecialNeed)
     .set('SpecialNeedReason', SpecialNeedReason)
     .set('Reason', Reason)
     .set('StatusID', '1')
     .set('IsActive', '1')
     .set('EmployeeName', localStorage.getItem('displayname'))
     .set('CreatedBy',  localStorage.getItem('EmployeeID'));
  return this.http.get<mydata>(SaveAdhocRequestURL,{params}).pipe(catchError(this.handleError));
  }
  getFeedbackData(): Observable<any>{
    let params = new HttpParams()
     .set('employeeLocID', localStorage.getItem('LocationID'));
  return this.http.get<mydata>(FeedbackURL,{params}).pipe(catchError(this.handleError));
  }
  saveFeedback(questionID:string,comments:string,date:string,reqFor:string): Observable<any>{
    let params = new HttpParams()
     .set('employeeID', localStorage.getItem('EmployeeID'))
     .set('questionID', questionID)
     .set('comments', comments)
     .set('date', date)
     .set('reqFor', reqFor);
  return this.http.get<mydata>(SaveFeedbackURL,{params}).pipe(catchError(this.handleError));
  }
/*.then(data => {

    console.log(data.status);
    console.log(data.data); // data received by server
    console.log(data.headers);

  })
  .catch(error => {

    console.log(error.status);
    console.log(error.error); // error message as string
    console.log(error.headers);

  });
   /*return response1;*/
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
