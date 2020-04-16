import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
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

  constructor(private tripservice :RestApiService,
    private router: Router,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private ga: GoogleAnalytics) { }

  ngOnInit() {
    this.ga.trackView('Trip Code Page').then(() => {}).catch(e => console.log(e));    
  }
  moveFocus(event, nextElement, previousElement) {
    if (event.keyCode == 8 && previousElement) {
      previousElement.setFocus();
    } else if (event.keyCode >= 48 && event.keyCode <= 57) {
      if (nextElement) {
        nextElement.setFocus();
      }
    } else {
      event.path[0].value = '';
    }
    //console.log(this.ainput.value)
  }
  SubmitOTP()
  {
    if(localStorage.getItem('routeassignedtoday') != null && localStorage.getItem('routeassignedtoday').length > 2 )
    {    
    if(this.ainput.value && this.binput.value && this.cinput.value 
      && this.dinput.value)
    {
      console.log("validate success")
     this.tripcode = this.ainput.value + this.binput.value + this.cinput.value + this.dinput.value; 
      console.log(this.tripcode)
      this.presentLoading();
        this.tripservice.SaveTripAttendance(this.tripcode).subscribe(res => { 
          this.reset()
            console.log("results are : " + JSON.stringify(res.results))
            this.loading.dismiss();            
              this.presentAlert(res.results.ErrorDesc);                
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
  }
  else
  {
    this.presentAlert("No Trips Today");  
  }
  }
  reset()
  {
      this.ainput.value='';
      this.binput.value='';
      this.cinput.value ='';
      this.dinput.value='';
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

}
