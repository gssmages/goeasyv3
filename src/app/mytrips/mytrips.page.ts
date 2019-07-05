import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {formatDate } from '@angular/common';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

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
  maxdate= new Date();
  maxDate=this.maxdate.setMonth(this.maxdate.getMonth()+2);
  dbdate='';
  maxformatDate='';
  nocancelrecord:boolean=false;
  showallcancel:boolean=false;
  norecordmytrip:boolean=false;
  showallmytrip:boolean=false;
  
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
  tripdetails:any;
  constructor( 
    private mytripservice :RestApiService,
    public loadingController: LoadingController,
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController,
    private ga: GoogleAnalytics) { }

  ngOnInit() {
    this.ga.trackView('My Trips Page').then(() => {}).catch(e => console.log(e));

    this.dbdate = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
    this.maxformatDate =formatDate(this.maxDate, 'yyyy-MM-dd', 'en-US', '+0530');

    this.presentLoading();
    this.mytripservice.getMyTripsData().subscribe(res => {
      this.loading.dismiss();
      console.log(res);
     // console.log("results are : " + JSON.stringify(res))
      this.mytrips=res.results.CancelTransportDetails;
      this.cancelledtrips=res.results.CancelMyTripDetails;
      this.requestfor=res.results.RequestForDetails;
      this.tripdetails='Activetrips';
      if(this.mytrips=='' || this.mytrips==null)
      {
        this.norecordmytrip=true;
        this.showallmytrip=false;
      }
      else
      {
        this.norecordmytrip=false;
        this.showallmytrip=true;
      }
      if(this.cancelledtrips==null || this.cancelledtrips=='')
      {
        this.nocancelrecord=true;
        this.showallcancel=false;
      }
      else
      {
        this.nocancelrecord=false;
        this.showallcancel=true;
      }
    }, err => {            
      console.log(err);
      this.loading.dismiss();
      this.presentAlert(err);           
  });
  }
  async canceltrip(event:any,item:any)
  {
    console.log(item.CabRequestID+"------------"+item.FromDate);
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
    if(this.RequestTypeName!="Regular")
    {
        if(this.RequestForName=="Pickup and Drop")
        {
          this.selectrequestfor();
        /*  const alertradio = await this.alertController.create({
            header: 'Choose Request for to cancel trip',
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
      
          await alertradio.present();*/
          
        }else{

          const confirm =  await this.alertController.create({
            header: 'GoEasy Trip Cancellation',
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
    else
    {
      const alertprompt = await this.alertController.create({
        header: 'Select From Date and To Date to cancel trip',
        inputs: [
          // input date with min & max
          {
            name: 'fromdate',
            type: 'date',
            min: this.dbdate,
            max: this.maxformatDate,
            value:this.dbdate
          },
          {
            name: 'todate',
            type: 'date',
            min: this.dbdate,
            max: this.maxformatDate,
            value:this.dbdate
          }
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
              
              console.log('Confirm Ok' + data);
              if(data.fromdate!="" && data.todate!="")
              {
                console.log(JSON.stringify(data));
                var fromdatearray=(data.fromdate).split('-');
                var todatearray=(data.todate).split('-');
                var fromdatestring = new Date(fromdatearray[0],fromdatearray[1]-1,fromdatearray[2]);
                var todatestring = new Date(todatearray[0],todatearray[1]-1,todatearray[2]);
                if(fromdatestring<=todatestring)
                {
                  alertprompt.message="";
                  this.FromDateOpnNoShow=(data.fromdate)+"T00:00:00";
                  this.ToDateOpnNoShow=(data.todate)+"T00:00:00";
                  console.log(this.FromDateOpnNoShow+"------"+this.ToDateOpnNoShow)
                  this.selectrequestfor();
                }
                else
                {
                  alertprompt.message="<span style='color:red'> To Date must be greater than From Date.</span>"; 
                  return false;
                }
              }
              else
              {
                alertprompt.message="<span style='color:red'> Please enter fromdate and todate</span>"; 
                return false;
              }

            }
          }
        ]
      });
  
      await alertprompt.present();
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
  async selectrequestfor() {
  const alertradio = await this.alertController.create({
    header: 'Choose Request for to cancel trip',
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
}
saveTripcancellation(requestforname:string, requestforid:string)
  {
    console.log(this.FromDateOpnNoShow+"------"+this.ToDateOpnNoShow)
     this.presentLoading();
        this.mytripservice.saveCancelTrips(requestforname,this.CabRequestID,this.FromDateOpnNoShow,this.ToDateOpnNoShow,this.employeeID,this.UserTime).subscribe(res => { 
            console.log("results are : " + JSON.stringify(res.results))
            this.loading.dismiss();
            this.presentAlert(res.results.ErrorDesc);    
        }, err => {            
            console.log(err);
            this.loading.dismiss();
            this.presentAlert(err);           
        });

  }
  /* saveTripcancellation(requestforname:string, requestforid:string)
  {
    console.log(this.FromDateOpnNoShow+"------"+this.ToDateOpnNoShow)
     this.presentLoading();
        this.mytripservice.saveCancelTrips(this.RequestTypeName, requestforname,
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

  } */
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
}
}
