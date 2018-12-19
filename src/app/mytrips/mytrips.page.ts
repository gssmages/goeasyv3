import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-mytrips',
  templateUrl: './mytrips.page.html',
  styleUrls: ['./mytrips.page.scss'],
})
export class MytripsPage implements OnInit {

  result :any;
  private loading: any;
  mytrips:any;
  cancelledtrips:any;
  requestfor:any;
  today= new Date();
  
  locationID:string=localStorage.getItem("LocationID");
  employeeID:string=localStorage.getItem("EmployeeID");
  RequestTypeName:any;
  RequestForName:any;
  ShiftTimeID:any;
  CabRequestID:any;
  FromDateOpnNoShow:any;
  ToDateOpnNoShow:any;
  RequestTypeID:any;
  RequestForID:any;  
  RequestedForName:any;
  ShiftTimeName:any;
  UserTime:string=formatDate(this.today, 'MM-dd-yyyy HH:mm:ss', 'en-US', '+0530');

  constructor( 
    private homeservice :RestApiService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController,
    private loginservice :RestApiService) { }

  ngOnInit() {
    this.presentLoading();
    this.homeservice.getMyTripsData().subscribe(res => {
      this.loading.dismiss();
      console.log(res);
     // console.log("results are : " + JSON.stringify(res))
      this.mytrips=res.results.CancelTransportDetails;
      this.cancelledtrips=res.results.CancelMyTripDetails;
      this.requestfor=res.results.RequestForDetails;
    }, err => {            
      console.log(err);
      this.loading.dismiss();
      this.presentAlert(err);           
  });
  }
  async canceltrip(event:any,item:any)
  {
    console.log(item.CabRequestID+"------------"+item.FromDateString);
    this.RequestTypeName=item.RequestTypeName;
    this.RequestForName=item.RequestForName;
    this.ShiftTimeID=item.ShiftTimeID;
    this.CabRequestID=item.CabRequestID;
    this.FromDateOpnNoShow=item.FromDate;
    this.ToDateOpnNoShow=item.ToDate;
    this.RequestTypeID=item.RequestTypeID;
    this.RequestForID=item.RequestForID;  
    this.RequestedForName=item.RequestForName;
    this.ShiftTimeName=item.ShiftStartTime+"-"+item.ShiftEndTime;
    if(this.RequestForName=="Pickup and Drop")
    {
      const alertradio = await this.alertController.create({
        header: 'Choose REquest for to cancel trip',
        inputs: [
          {
            name: 'radio1',
            type: 'radio',
            label: 'Pickup and Drop',
            value: 'Pickup and Drop_'+this.requestfor[0].RequestForID,
            checked: true
          },
          {
            name: 'radio2',
            type: 'radio',
            label: 'Pickup',
            value: 'Pickup_'+this.requestfor[1].RequestForID
          },
          {
            name: 'radio3',
            type: 'radio',
            label: 'Drop',
            value: 'Drop_'+this.requestfor[2].RequestForID
          },
          
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: data => {
              var reqname=data.split('_');
              this.RequestForName=reqname[0];
              this.RequestForID=reqname[1];
              console.log(this.RequestForName+"---"+this.RequestForID)
              this.saveTripcancellation(this.RequestForName,this.RequestForID);
            }
          }
        ]
      });
  
      await alertradio.present();
      
    }else{

      const confirm =  await this.alertController.create({
        header: 'Goeasy Trip Cancellation',
        message: 'Do you agree to cancel this trip on '+item.FromDateString,
        buttons: [
          {
            text: 'NO',
            handler: () => {
              console.log('No clicked');
            }
          },
          {
            text: 'YES',
            handler: () => {
              this.saveTripcancellation(this.RequestForName,this.RequestForID);
              console.log('yes clicked');
  
            }
          }
        ]
      });
      await confirm.present();
    }
   
  
  }
  async presentAlert(alertmessage:string) {
    const alert = await this.alertController.create({
      header: 'Goeasy Alert',
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
  saveTripcancellation(requestforname:string, requestforid:string)
  {
     this.presentLoading();
        this.loginservice.saveCancelTrips(this.RequestTypeName, requestforname,
          this.ShiftTimeID, this.CabRequestID,this.FromDateOpnNoShow,this.ToDateOpnNoShow,
          this.RequestTypeID,requestforid,this.RequestedForName,this.ShiftTimeName,
          this.locationID,this.employeeID,this.UserTime).subscribe(res => { 
            console.log("results are : " + JSON.stringify(res.results))
            this.loading.dismiss();
            this.presentAlert(res.results);    
        }, err => {            
            console.log(err);
            this.loading.dismiss();
            this.presentAlert(err);           
        });

  }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
}
}
