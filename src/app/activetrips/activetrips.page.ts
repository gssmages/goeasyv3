import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController,ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { AreamodalComponent } from '../areamodal/areamodal.component';
@Component({
  selector: 'app-activetrips',
  templateUrl: './activetrips.page.html',
  styleUrls: ['./activetrips.page.scss'],
})

export class ActivetripsPage implements OnInit {
  @ViewChild('a') ainput:any;
  @ViewChild('b') binput:any;
  @ViewChild('c') cinput:any;
  @ViewChild('d') dinput:any;
  tripcode:string="";
  private loading: any;

  nodalpointid= "";
  routechange = "false";
  constructor(private tripservice :RestApiService,
    private router: Router,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private ga: GoogleAnalytics,    
    public modalController: ModalController) { }

  ngOnInit() {
    this.ga.trackView('Trip Code Page').then(() => {}).catch(e => console.log(e));    
  }
  moveFocus(event, nextElement, previousElement) {
     console.log(event.which + "event.which")
    console.log(event.keyCode + "event.keyCode")
    if(event.target.value.length < 1 && previousElement){
      previousElement.setFocus()
    }
    else if(nextElement && event.target.value.length>0){
      nextElement.setFocus();
    }
    else {
     return 0;
    } 
   /*  var charCode = (event.which) ? event.which : event.keyCode
    if (charCode == 8 && previousElement) {
      previousElement.setFocus();
    } else if (charCode >= 48 && charCode <= 57) {
      if (nextElement) {
        nextElement.setFocus();
      }
    } else {
      event.path[0].value = '';
    }  
    if(event.path[0].value.length > 1)
    {
      event.path[0].value = '';
    } */
    //console.log(this.ainput.value)
  }
  SubmitOTP()
  {
   // if(localStorage.getItem('routeassignedtoday') != null && localStorage.getItem('routeassignedtoday').length > 2 )
   // {    
    if(this.ainput.value && this.binput.value && this.cinput.value 
      && this.dinput.value)
    {
      console.log("validate success")
     this.tripcode = this.ainput.value + this.binput.value + this.cinput.value + this.dinput.value; 
      console.log(this.tripcode)
      this.presentLoading();
        this.tripservice.SaveTripAttendance(this.tripcode,this.routechange,this.nodalpointid).subscribe(res => { 
         
            console.log("results are : " + JSON.stringify(res.results))
            this.loading.dismiss();  
            if (res.results.ErrorCode == "0" || res.results.ErrorCode == "3") {          
              this.presentAlert(res.results.ErrorDesc);  
              this.reset()
            }
            else if(res.results.ErrorCode == "1"){
              console.log(res.results.ErrorDesc)
              this.Confirmroutechange(res.results.ErrorDesc)
            }
            else if(res.results.ErrorCode == "2"){
              this.presentModal()
              console.log("Employee ID not in this Roaster ")
            }
        }, err => {            
          this.reset()
            console.log(err);
            this.loading.dismiss();
            this.presentAlert(err);           
        });
    }
    else{
      this.reset()
      console.log("Incorrect Trip Code")
      this.presentAlert("Incorrect Trip Code");  
    }
  /* }
  else
  {
    this.presentAlert("No Trips Today");  
  } */
  }
  reset()
  {
      this.ainput.value='';
      this.binput.value='';
      this.cinput.value ='';
      this.dinput.value='';
      this.nodalpointid= "";
      this.routechange = "false";
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
  async Confirmroutechange(message: string) {
    const confirm =  await this.alertController.create({
      header: 'GoEasy Confirm Route Change',
      message: message,
      buttons: [
       /*  {
          text: 'NO',
          handler: () => {
            console.log('No clicked');
          }
        }, */
        {
          text: 'OK',
          handler: () => {
            this.routechange="true";
            console.log('yes clicked');
            this.SubmitOTP();
          }
        }
      ]
    });
    await confirm.present();
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: AreamodalComponent
    }); 
    modal.onDidDismiss()
        .then((data) => {
          console.log('MODAL DATA', data.data);
          if(data.data!="0")
          {
            this.nodalpointid=data.data;
            console.log('MODAL DATA', data.data);
            this.SubmitOTP();
          }
          
      });
  
    return await modal.present();
  }

}
