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
   data1: Observable<any>;
   private loading: any;
    constructor(
    private homeservice :RestApiService,
     public loadingController: LoadingController,
     public route: ActivatedRoute,
     public router: Router,
     private http: HttpClient,
     public alertController: AlertController,
     public globals: Globals
    ) { }

    ngOnInit(){     
      
        this.presentLoading();

        this.homeservice.getData("asd","asd","asd").subscribe(res => {
            console.log(res);
            this.loading.dismiss();
            this.pickupdetails = res.results.PickupRequestDetail;
            this.dropdetails = res.results.DropRequestDetail;
            this.employeedetails=res.results.EmployeeDetails;
            this.globals.displayname=this.employeedetails.DisplayName;
            this.globals.businesstitle=this.employeedetails.BusinessTitle;
            
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

        });
    }
    async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Goeasy Alert',
      message: JSON.stringify(this.dropdetails),
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
