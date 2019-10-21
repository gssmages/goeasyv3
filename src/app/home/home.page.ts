import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { RestApiService } from '../rest-api.service';
import { AlertController } from '@ionic/angular';
import { Globals } from '../global';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { QrcodemodalComponent } from '../qrcodemodal/qrcodemodal.component';
import {formatDate } from '@angular/common';
export interface Dropdetails
    {
        RequestTypeName: string;
        DropArea: string;
        Shift: string;
        DropOrder: string;
        RouteNumber: string;
        VehicleTypeName: string;
        RegNumber: string;
        DriverName: string;
        DriverContact: string;
    }
    export  interface Pickupdetails
    {
        RequestTypeName: string;
        Area: string;
        Shift: string;
        BoardingTime: string;
        RouteNumber: string;
        VehicleTypeName: string;
        RegNumber: string;
        DriverName: string;
        DriverContact: string;
    }
const apiUrl = "http://gssnte811.asia.ad.flextronics.com:4042/api/DashBoardApi/GetDashboardDetails/?";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})



export class HomePage{

   
    /*  async setData(key, value) {
    const res = await this.storage.set(key, value);
    console.log(res);
  }*/
    result :any;
    pickupdetails:any;
    dropdetails:any;
    employeedetails:any;
    pickupshow: boolean = false;
    dropshow: boolean = false;
    showfooter:boolean=false;
   data1: Observable<any>;
   private loading: any;
   dailyroute:any;
   noshowcount:any='0';
  
   today= new Date();
   startdate:Date = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
   enddate:Date = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
   
   fromdate:any=formatDate(this.startdate, 'MM-dd-yyyy', 'en-US', '+0530');
   todate:any=formatDate(this.enddate, 'MM-dd-yyyy', 'en-US', '+0530');

   thismonth:any=formatDate(this.today, 'MMM-yyyy', 'en-US', '+0530');
    constructor(
      private platform: Platform,
      private homeservice :RestApiService,
     public loadingController: LoadingController,
     public route: ActivatedRoute,
     public router: Router,
     private http: HttpClient,
     public alertController: AlertController,
     public globals: Globals,
     private ga: GoogleAnalytics,
     public modalController: ModalController
     ) { }

    ngOnInit(){ 
      this.platform.backButton.subscribeWithPriority(9999, () => {
        document.addEventListener('backbutton', function (event) {
          event.preventDefault();
          event.stopPropagation();
          console.log('hello');
        }, false);
      });
    }
      ionViewWillEnter() {  
      console.log((this.fromdate)+"---"+(this.todate));
      this.ga.trackView('Home Page').then(() => {}).catch(e => console.log(e));
        this.presentLoading();
        this.homeservice.getNoShows(this.fromdate, this.todate).subscribe(res => { 
          console.log("results are : " + JSON.stringify(res.results))
          this.noshowcount=res.results.length;
          console.log(this.noshowcount)
      }, err => {            
          console.log(err);
          this.presentAlert(err);          
      });
        this.homeservice.getDashboardData().subscribe(res => {
            console.log(res);
            this.loading.dismiss();
            this.pickupdetails = res.results.PickupRequestDetail;
            this.dropdetails = res.results.DropRequestDetail;
            this.employeedetails=res.results.EmployeeDetails;
            this.globals.displayname=this.employeedetails.DisplayName;
            this.globals.businesstitle=this.employeedetails.BusinessTitle;
            localStorage.setItem("displayname",this.employeedetails.DisplayName);
            localStorage.setItem("EmployeeMailID",this.employeedetails.eMail);
            localStorage.setItem("Postalcode",this.employeedetails.PostalCode);
            localStorage.setItem("Grade",this.employeedetails.Grade);
            localStorage.setItem("Regular",this.employeedetails.Regular);
            localStorage.setItem("SupervisorID",this.employeedetails.SupervisorEmployeeID);
            localStorage.setItem("SupervisorName",this.employeedetails.SupervisorDisplayName);
            localStorage.setItem("SupervisorMailID",this.employeedetails.SupervisoreMail);
            //for Google Analytics username need to be set 
            this.ga.setUserId(localStorage.getItem('displayname'))
            console.log(localStorage.getItem('displayname'))    
            this.dailyroute='Pickup';
           
            if(this.pickupdetails==null)
            {
                console.log(this.pickupdetails)
                this.pickupshow=false;
            }
            else
            {
                this.pickupshow=true;

            }
            if(this.dropdetails==null)
            {
                console.log(this.dropdetails)
                this.dropshow=false;
            }
            else
            {
                this.dropshow=true;
            }
            console.log("results are : " + JSON.stringify(this.employeedetails))
        //this.presentAlert();
       

        }, err => {      
          this.presentAlert(err);        
           console.log(err);
           setTimeout(() => {
             this.loading.dismiss();
         }, 2000);
                   
       });

        if(localStorage.getItem('LocationName') =="Chennai" || localStorage.getItem('LocationName')=="Pune"){
            this.showfooter=true;
        }
        else
        {
            this.showfooter=false;
        }
      
    }
    async presentAlert(alertmessage:string) {
    const alert = await this.alertController.create({
      header: 'GoEasy Alert',
      message: alertmessage,
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Loading....',
    });
    return await this.loading.present();
  }
 
  async presentModal() {
    const modal = await this.modalController.create({
      component: QrcodemodalComponent
    }); 
  
    return await modal.present();
  }
  
/*async getData() {
  const loading = await this.loadingController.create({
    message: 'Loading'
  });
  await loading.present();
    
   this.data1= this.http.get(apiUrl);
    this.data1.subscribe(res => {
            console.log(res);
            this.result = res;
        });*/
    /* let response1 =   this.http.get(apiUrl+"todaysdate=11-23-2018&location=Chennai&employeeID=941364", {}, {})
  .then(data => {

    console.log(data.status);
    console.log(data.data); // data received by server
    console.log(data.headers);

  })
  .catch(error => {

    console.log(error.status);
    console.log(error.error); // error message as string
    console.log(error.headers);

  });*/
 /* this.api.getData()
    .subscribe(res => {
      console.log(res);
          this.data1 = res[0];
          this.data2 = res[1];
          this.data3 = res[2];
          this.data4 = res[3];
      loading.dismiss();
    }, err => {
      console.log(err);
      loading.dismiss();
    });*/
/*}*/
   /* async getClassroom() {
        const loading = await this.loadingController.create({
            content: 'Loading'
        });
        await loading.present();
        await this.api.getClassroomById(this.route.snapshot.paramMap.get('id'))
            .subscribe(res => {
            console.log(res);
            this.classroom = res;
            loading.dismiss();
        }, err => {
            console.log(err);
            loading.dismiss();
        });
    }*/
     segmentChanged(ev: any) {
        console.log('Segment changed', ev);
    }
}
