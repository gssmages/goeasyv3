import { Component, OnInit,ViewChild } from '@angular/core';
import {formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-adhocrequest',
  templateUrl: './adhocrequest.page.html',
  styleUrls: ['./adhocrequest.page.scss'],
})
export class AdhocrequestPage implements OnInit {
  requesttypelist:any;
  requestforlist:any;
  areadetailslist:any;
  boardingpointlist:any;
  shifttimelist:any;
  boardinglisttemp:any = [];

  today= new Date();
  maxdate= new Date();
  usertime = '';
  dbdate='';
  maxformatDate='';
  maxDate=this.maxdate.setMonth(this.maxdate.getMonth()+2);
  private loading: any;

  showPleasespecify:boolean=false;
/*   showFromTodate:boolean=false;
  showdate:boolean=true; */
  specialneed:any;
  requesttype:any; 
  requesttypename:any;  
  fromdate:any;
  todate:any;
  requestfor:any;
  requestforname:any='';
  shifttime:any;
  shifttimename:any;
  area_relarea:any;
  areaid:any;
  areaname:any;
  boardingpoint:any;
  boardingpointname:any;
  pleasespecify:any='';
  resonforadhoc:any='';
  reason:any='';
  overwrite:any="null";

  constructor(
    private adhocservice :RestApiService,
    private router: Router,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private ga: GoogleAnalytics) { 
    
  }
  
  ngOnInit() {
    this.ga.trackView('Adhoc Request Page').then(() => {}).catch(e => console.log(e));

    this.usertime = formatDate(this.today, 'MM-dd-yyyy HH:mm:ss', 'en-US', '+0530');
    this.dbdate = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
    this.maxformatDate =formatDate(this.maxDate, 'yyyy-MM-dd', 'en-US', '+0530');
    this.fromdate=this.dbdate;
    this.todate=this.dbdate;
    console.log("today date-->"+this.dbdate);
    console.log("today date-->"+this.maxformatDate);
    /*this.requesttype = [ {  id: '8f8c6e98',name: 'USA', code: 'USD' },{  id: '169fee1a',name: 'Canada',code: 'CAD'},
      {  id: '3953154c', name: 'UK', code: 'GBP' },{  id: '68c61e29', name: 'UK', code: 'GBP'   }];*/
  
    this.presentLoading();
    this.adhocservice.getAdhocrequestData().subscribe(res => { 
        this.loading.dismiss();
       console.log(res);
       this.requesttypelist=res.results[0].RequestTypeDetails;
       this.requestforlist=res.results[0].RequestForDetails;
       this.areadetailslist=res.results[0].AreaDetails;
       this.boardingpointlist=res.results[0].RelBoardingPointDetails;
       this.shifttimelist=res.results[0].ShiftTimeDetails;

       console.log("results are : " + JSON.stringify(this.requesttypelist))       
      //  this.presentAlert(res.results); 
    }, err => {            
        console.log(err);
        this.loading.dismiss();
        this.presentAlert(err);           
    });
  }
  checkNeed(selectedval:any)
  {
    console.log(selectedval)
    if(selectedval=="1")
      this.showPleasespecify=true;
    else
    {
      this.showPleasespecify=false;
      this.pleasespecify="";
    }
     
  }
  checkType(selectedval:any)
  {
    this.requesttypename=selectedval.detail.text;
    console.log(selectedval.detail.text +"-"+ this.requesttype)
    /* if(this.requesttypename=="Month end")    {      this.showFromTodate=true;       this.showdate=false;    }
    else    {      this.showFromTodate=false;      this.showdate=true;    } */      
  }
  getrequestfor(selectedval:any)
  {
    this.requestforname=selectedval.detail.text;
    this.shifttime="";
  }
  getshifttime(selectedval:any)
  {
    console.log(selectedval)
    for (let i = 0; i < this.shifttimelist.length; i++) {
      if(this.shifttimelist[i].TimeID == selectedval)
      {
        this.shifttimename=this.shifttimelist[i].StartTime+'-'+this.shifttimelist[i].EndTime;
        console.log(this.shifttimename)
      }
    }
    //this.shifttimename=item.StartTime+'-'+item.EndTime;
  }
  getboardingname(selectedval:any)
  {
    this.boardingpointname=selectedval.detail.text;
    console.log(this.boardingpointname)
    this.boardingpoint=selectedval.detail.value;
  }
  changeArea(selectedval:any)
  {
    this.areaname=selectedval.detail.text;
    this.boardinglisttemp=[];
    this.boardingpoint='';
    console.log(selectedval)
    console.log(this.area_relarea)
    var areaarray=(this.area_relarea).split("_");
    this.areaid=areaarray[0];
    var relareaid=areaarray[1];
    for (let i = 0; i < this.boardingpointlist.length; i++) {
      if(this.boardingpointlist[i].Area == relareaid)
      {
        console.log(this.boardingpointlist[i])
        this.boardinglisttemp.push(this.boardingpointlist[i]);
      }
    }
    console.log(this.boardinglisttemp)
  }
  validatearea()
  {
    console.log(this.areaname)
    if(this.areaname=="")
    {
      console.log(this.areaname)
      this.boardinglisttemp=[];
    }
  }
  reset()
  {
    console.log("click the reset button")
    this.requesttype="";
    this.requesttypename="";
    this.requestfor="";
    this.requestforname="";
    this.specialneed="0";
    this.fromdate=formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
    this.todate=formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
    this.shifttime="";
    this.shifttimename="";
    this.areaid="";
    this.area_relarea="";
    this.areaname="";
    this.boardingpoint="";
    this.boardinglisttemp=[];
    this.boardingpointname="";
    this.pleasespecify="";
    this.resonforadhoc="";
    this.dbdate=formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
    this.overwrite="null";
    this.reason="";
    console.log("Reset succesfully")
  }
  validateRequest()
  {
    console.log("click the Submit button")
    //console.log(this.requesttype +"--"+ this.requestfor+"--"+  this.shifttime +"--"+  this.area_relarea+"--"+  this.boardingpoint)
    if(this.requesttype && this.requestfor && this.shifttime && this.area_relarea && this.boardingpoint)
    {
        console.log("validate success")
        /* if(this.requesttype=="4")
        { console.log(this.requesttype) */
         
          if(this.fromdate && this.todate)
          {
            console.log(this.fromdate +" ---- " +this.todate)
            var fromdatearray=(this.fromdate).split('-');
            var todatearray=(this.todate).split('-');
         var fromdatestring = new Date(fromdatearray[2],fromdatearray[0]-1,fromdatearray[1]);
          var todatestring = new Date(todatearray[2],todatearray[0]-1,todatearray[1]);
            if(fromdatestring<=todatestring)
                {
                  if(this.specialneed=="1")
                  {
                    if(this.pleasespecify){
                      this.submitRequest();
                    }
                    else
                    {
                      this.presentAlert('Please choose Please Specify.');
                    }
                  }
                  else{
                    this.submitRequest();
                  }
                }
                else{
                  this.presentAlert('To Date must be greater than From Date.');
                }
          }
          else
          {
            this.presentAlert('Please choose From Date and To Date.');
          }
       /*  }
        else
        {
          if(this.dbdate)
          {
            if(this.specialneed=="1")
            {
              if(this.pleasespecify){
                this.submitRequest();
              }
              else
              {
                this.presentAlert('Please choose Please Specify.');
               }
            }
            else{
              this.submitRequest();
            }
          }
          else
          {
            this.presentAlert("Please select date.")
          }
        } */
    }
    else
    {
      this.presentAlert("Please select all the required field.")
    }
  }
  submitRequest()
  {
   if(this.resonforadhoc=='')
    this.reason="null";
    else
    this.reason=this.resonforadhoc;
    console.log("submit request")
  //  var currentDate=formatDate(new Date(this.dbdate), 'MM-dd-yyyy', 'en-US', '+0530');
    //var fromDate=formatDate(new Date(this.fromdate), 'MM-dd-yyyy', 'en-US', '+0530');
   // var toDate=formatDate(new Date(this.todate), 'MM-dd-yyyy', 'en-US', '+0530');
   
    console.log(this.overwrite+"--"+this.fromdate+"---"+this.todate)
    this.presentLoading();
        this.adhocservice.saveAdhocrequest(this.requesttype,this.requesttypename,this.requestfor,this.requestforname,
          this.specialneed,this.fromdate,this.todate,this.shifttime,this.shifttimename,this.areaid,this.areaname,
          this.boardingpoint,this.boardingpointname,this.pleasespecify,this.reason,this.usertime,this.dbdate,this.overwrite).subscribe(res => { 
           console.log("results are : " + JSON.stringify(res.results))
            this.loading.dismiss();
            if(res.results.ErrorCode=='0')
            {
              this.reset();
              this.presentAlert(res.results.ErrorDesc);               
            }
            else if(res.results.ErrorCode=='16')
            {
              console.log(res.results.ErrorCode+"--"+res.results.ErrorDesc)
              this.showAdhocconfirm(res.results.ErrorDesc);
            }
            else if(res.results.ErrorCode=='15'){
              console.log(res.results.ErrorCode+"--"+res.results.ErrorDesc)
              this.showOverwriteconfirm(res.results.ErrorDesc);
            }
            else{
              this.presentAlert(res.results.ErrorDesc);
            }
            
        }, err => {            
            console.log(err);
            this.loading.dismiss();
            this.presentAlert(err);           
        });
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
  async showAdhocconfirm(promptmessage:string) {
  const confirm =  await this.alertController.create({
    header: 'GoEasy Confirmation',
    message: promptmessage,
    buttons: [
      {
        text: 'No',
        handler: () => {
          console.log('No clicked');
          this.overwrite="null";
          console.log(this.overwrite);
        }
      },
      {
        text: 'Yes',
        cssClass: 'alertconfirmation',
        handler: () => {
          console.log('yes clicked');
          this.overwrite="1";
          console.log(this.overwrite);
          this.submitRequest();
        }
      }
    ]
  });
  await confirm.present();
}
async showOverwriteconfirm(promptmessage:string) {
  const confirm =  await this.alertController.create({
    header: 'GoEasy Confirmation',
    message: promptmessage,
    buttons: [
      {
        text: 'Keep Both Request',
        cssClass: 'alertconfirmation',
        handler: () => {
          console.log('No clicked');
          this.overwrite="0";
          console.log(this.overwrite);
          this.submitRequest();
        }
      },
      {
        text: 'Overwrite',
        handler: () => {
          console.log('yes clicked');
          this.overwrite="1";
          console.log(this.overwrite);
          this.submitRequest();
        }
      }
    ]
  });
  await confirm.present();
}


}
