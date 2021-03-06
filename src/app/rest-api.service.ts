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

//const SITserver="http://gssnte811.asia.ad.flextronics.com:4042"; //
//const testserver="https://testmobile.flextronics.com/goeasyapi";
//const prodserver="http://sacnt2315.americas.ad.flextronics.com/goeasyapi";
const prodserver="https://mobileservice.flex.com/goeasyapi"; 
//const CIPProdserver="http://hkdnt955.asia.ad.flextronics.com:94"; 
const CIPProdserver="https://mobileservice.flex.com/goeasyapi_cip";
//const SITserver="http://localhost:57855";
const SITserver="http://sgdnte250.asia.ad.flextronics.com:1227";
/****   Goeasy SIT Server ***********/
const LoginURL=SITserver+"/api/login/CheckLoginDetailEncryption?";
const SSOLoginURL=SITserver+"/api/login/CheckLoginDetailDecryption?";
const DashboardUrl = SITserver+"/api/DashBoardApi/GetDashboardDetails/?";
const MytripsURL=SITserver+"/api/MyTripsApi/GetMyTripsDetails?";
//const SaveNoShowURL="http://gssnte811.asia.ad.flextronics.com:4042/api/CancelTransportRequestApi/SaveCancelRequests?"; 
const SaveNoShowURL=SITserver+"/api/CancelTransportRequestApi/CabRequestCancel?";
const MyApprovalURL=SITserver+"/api/CabApprovalApi/ReadPendingRequests/?";
const SaveMyApprovalURL=SITserver+"/api/cabapprovalapi/ApprovePendingRequests?";
const AdhocRequestURL=SITserver+"/api/AdhocCabRequestApi/ReadAdhocCabRequestValues/?";
const SaveAdhocRequestURL=SITserver+"/api/AdhocCabRequestApi/SaveCabRequest?"; 
const FeedbackURL=SITserver+"/api/FeedbackApi/GetMobileQuestions?";
const SaveFeedbackURL=SITserver+"/api/FeedbackApi/SaveMobileFeedback?";
const MyApprovalCIPURL=SITserver+"/api/SpecialCabRequestApi/GetSpecialCabDetails/?";
const SaveMyApprovalCIPURL=SITserver+"/api/SpecialCabRequestApi/SaveApproveRejectData/?";
const MyBlockApprovalURL=SITserver+"/api/CabApprovalApi/GetBlockUserDetails?"; 
const UnblockEmployeesURL=SITserver+"/api/CabApprovalApi/UnblockEmployees/?"; 
const GetNoShowsURL=SITserver+"/api/MyTripsApi/getNoShow/";
const GetCancelledtripsURL=SITserver+"/api/MyTripsApi/getCancelledTrips?";
const SaveTripAttendanceUrl = SITserver+"/api/DashBoardApi/SaveTripAttendance/?";
const AreaURL=SITserver+"/api/DriverMobileApi/AreaNodalPoint?";
const GeolocationURL=SITserver+"/api/DashBoardApi/VehicleTrackingUserMobile/?";
//const GeolocationURL="https://my-json-server.typicode.com/gssmages/jsonserver/goeasylocation"; 
/****   Goeasy Testing Server --f5 enabled URL https://testmobile.flextronics.com/goeasyapi/   ***/
/*********Goeasy Prod Server ************* */
/* const LoginURL=prodserver+"/api/login/CheckLoginDetailEncryption?";
const SSOLoginURL=prodserver+"/api/login/CheckLoginDetailDecryption?";
const DashboardUrl = prodserver+"/api/DashBoardApi/GetDashboardDetails/?";
const MytripsURL=prodserver+"/api/MyTripsApi/GetMyTripsDetails?";
const SaveNoShowURL=prodserver+"/api/CancelTransportRequestApi/CabRequestCancel?"; 
const MyApprovalURL=prodserver+"/api/CabApprovalApi/ReadPendingRequests/?";
const SaveMyApprovalURL=prodserver+"/api/cabapprovalapi/ApprovePendingRequests?";
const AdhocRequestURL=prodserver+"/api/AdhocCabRequestApi/ReadAdhocCabRequestValues/?";
const SaveAdhocRequestURL=prodserver+"/api/AdhocCabRequestApi/SaveCabRequest?"; 
const FeedbackURL=prodserver+"/api/FeedbackApi/GetMobileQuestions?";
const SaveFeedbackURL=prodserver+"/api/FeedbackApi/SaveMobileFeedback?";
const MyApprovalCIPURL=CIPProdserver+"/api/SpecialCabRequestApi/GetSpecialCabDetails/?";
const SaveMyApprovalCIPURL=CIPProdserver+"/api/SpecialCabRequestApi/SaveApproveRejectData/?";  
const MyBlockApprovalURL=prodserver+"/api/CabApprovalApi/GetBlockUserDetails?"; 
const UnblockEmployeesURL=prodserver+"/api/CabApprovalApi/UnblockEmployees/?"; 
const GetNoShowsURL=prodserver+"/api/MyTripsApi/getNoShow/";
const GetCancelledtripsURL=prodserver+"/api/MyTripsApi/getCancelledTrips?";
const SaveTripAttendanceUrl = prodserver+"/api/DashBoardApi/SaveTripAttendance/?";
const AreaURL=prodserver+"/api/DriverMobileApi/AreaNodalPoint?";  */
interface mydata
    {
        obj: Object;
    }

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  dbdate='';currentdate='';
  today= new Date();
  errormsg ='';
  constructor(private http: HttpClient,public globals: Globals) {
    this.dbdate = formatDate(this.today, 'MM-dd-yyyy', 'en-US', '+0530')
    this.currentdate = formatDate(this.today, 'ddMMMyyyy', 'en-US', '+0530')
   }
    
   private handleError(error: HttpErrorResponse) {
  
    if (!navigator.onLine) {
      console.error('No Internet Connection')
      this.errormsg = 'No Internet Connection';
  }
    else if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code. 'Network failed. Please try again.'
      // The response body may contain clues as to what went wrong,
      this.errormsg = `Server Error Status: ${error.status} Text: ${error.statusText}`
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(this.errormsg);
  }
 /* 
private extractData(res: Response) {
  let body = res;
  return body || { };
}*/

getLoginData(username: string, password: string): Observable<any>{
  let params = new HttpParams()
   .set('username', username)
   .set('keyword', password);
return this.http.get<mydata>(LoginURL,{params}).pipe(catchError(this.handleError));
}
getSSOLoginData(username: string, password: string): Observable<any>{
  let params = new HttpParams()
   .set('enuserName', username)
   .set('enpassword', password);
return this.http.get<mydata>(SSOLoginURL,{params}).pipe(catchError(this.handleError));
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

  /* saveCancelTrips(RequestTypeName:string,RequestForName:string,ShiftTimeID:string,
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
  } */

  saveCancelTrips(RequestForName:string,CabRequestID:string,FromDateOpnNoShow:string,
    ToDateOpnNoShow:string,employeeID:string,UserTime:string,RequestTypeName:string,ShiftStartTime:string,ShiftEndTime:string): Observable<any>{
    let params = new HttpParams()
     .set('Location', localStorage.getItem('LocationName'))
     .set('CabRequestID', CabRequestID)
     .set('EmployeeID', employeeID)
     .set('FromDate', FromDateOpnNoShow)
     .set('ToDate', ToDateOpnNoShow)     
     .set('RequestFor', RequestForName)     
     .set('UserTime', UserTime)
     .set('RequestTypeName', RequestTypeName)
     .set('EmployeeName', localStorage.getItem('displayname'))
     .set('ShiftStartTime', ShiftStartTime)     
     .set('ShiftEndTime', ShiftEndTime);
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
    SpecialNeedReason:string,Reason:string,UserTime:string,CommonDate:string,OverWrite:string,AdhocYesno:string): Observable<any>{
    let params = new HttpParams()
     .set('Location', localStorage.getItem('LocationName'))
     .set('EmployeeID',  localStorage.getItem('EmployeeID'))
     .set('ReportingTo', localStorage.getItem('SupervisorID'))
     .set('PostalCode', localStorage.getItem('Postalcode'))
     .set('RequestType', RequestTypeName)
     .set('FromDate', FromDate)
     .set('ToDate', ToDate)
     .set('RequestFor', RequestForName)
     .set('RelShiftID', Shift)
     .set('Shift', ShiftTimeName)
     .set('Area', AreaName)
     .set('BoardDrop', BoardingPointName)
     .set('SpecialNeed', SpecialNeed)
     .set('SpecialNeedReason', SpecialNeedReason)
     .set('AdhocRemarks', Reason)
     .set('OverWrite',OverWrite)
     .set('AdhocYesNo',AdhocYesno)
     .set('LoggedInEmployeeName', localStorage.getItem('displayname'))     
     .set('UserTime', UserTime)
     .set('Grade', localStorage.getItem('Grade'))
     .set('Regular',  localStorage.getItem('Regular'))
     .set('EmployeeeMail', localStorage.getItem('EmployeeMailID'))
     .set('ManagerName',  localStorage.getItem('SupervisorName'))
     .set('ManagereMail', localStorage.getItem('SupervisorMailID'));
  return this.http.get<mydata>(SaveAdhocRequestURL,{params}).pipe(catchError(this.handleError));
  }
  /* saveAdhocrequest(RequestTypeID:string,RequestTypeName:string,RequestForID:string,
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
  } */
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
  getMyBlockApprovalData(): Observable<any>{
    let params = new HttpParams()
    .set('LocationName',localStorage.getItem('LocationName'))
     .set('employeeID', localStorage.getItem('EmployeeID'))
     .set('pAction','1');
  return this.http.get<mydata>(MyBlockApprovalURL,{params}).pipe(catchError(this.handleError));
  }
  saveUnblockEmployees(employeeIDlist:string,comments:string): Observable<any>{
    let params = new HttpParams()
     .set('employeeID', employeeIDlist)
     .set('approverID', localStorage.getItem('EmployeeID'))
     .set('comments', comments)
     .set('locationName', localStorage.getItem('LocationName'))
     .set('appversion', this.globals.appversion);
  return this.http.get<mydata>(UnblockEmployeesURL,{params}).pipe(catchError(this.handleError));
  }
  getNoShows(fromdate:string,todate:string): Observable<any>{
    let params = new HttpParams()
     .set('startDate', fromdate)
     .set('endDate', todate)
     .set('employeeID', localStorage.getItem('EmployeeID'));
  return this.http.get<mydata>(GetNoShowsURL,{params}).pipe(catchError(this.handleError));
  }
  getCancelledtrips(fromdate:string,todate:string): Observable<any>{
    let params = new HttpParams()
     .set('from', fromdate)
     .set('to', todate)
     .set('employeeID', localStorage.getItem('EmployeeID'));
return this.http.get<mydata>(GetCancelledtripsURL,{params}).pipe(catchError(this.handleError));
  }
  SaveTripAttendance(tripcode:string, routechange:string,nodalpoint:string ): Observable<any>{
    let params = new HttpParams()
     .set('todaysdate', this.dbdate)
     .set('employeeID', localStorage.getItem('EmployeeID'))
     .set('locationID',localStorage.getItem('LocationID'))
     .set('Tripcode', tripcode)
     .set('NodalPointID',nodalpoint)
     .set('RouteChange', routechange);
  return this.http.get<mydata>(SaveTripAttendanceUrl,{params}).pipe(catchError(this.handleError));
  }
  getArea(locationname: string): Observable<any>{
    let params = new HttpParams()
    .set('LocationName', locationname)
  return this.http.get(AreaURL,{params}).pipe(catchError(this.handleError));
  }
  getVehicleLocation(routeNo:string, shiftTime:string): Observable<any>{
    let params = new HttpParams()
    .set('location', localStorage.getItem('LocationName'))
    .set('routeNo', routeNo)
    .set('travelDate', this.currentdate)
    .set('shiftTime', shiftTime);
  return this.http.get<mydata>(GeolocationURL,{params}).pipe(catchError(this.handleError));
  }

}
