import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-noshow',
  templateUrl: './noshow.page.html',
  styleUrls: ['./noshow.page.scss'],
})
export class NoshowPage implements OnInit {
  private loading: any;
  choosendate: any;
  today = new Date();
  minDate=new Date(this.today.getFullYear(), this.today.getMonth()-5, 0);
  mindateformat:any;
  startdate: Date = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
  enddate: Date = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);

  fromdate: any = formatDate(this.startdate, 'MM-dd-yyyy', 'en-US', '+0530');
  todate: any = formatDate(this.enddate, 'MM-dd-yyyy', 'en-US', '+0530');
  noshowlist: any;
  maxformatDate: any;
  date: any;
  norecord:boolean=false;
  showall:boolean=false;
  constructor(private noshowservice: RestApiService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private ga: GoogleAnalytics) { }

  ngOnInit() {
    console.log(this.minDate)
    this.mindateformat=formatDate(this.minDate, 'yyyy-MM-dd', 'en-US', '+0530');
    this.maxformatDate = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
    this.date = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530')
    this.ga.trackView('My Trips Page').then(() => { }).catch(e => console.log(e));
    this.presentLoading();
    this.noshowservice.getNoShows(this.fromdate, this.todate).subscribe(res => {
      console.log("results are : " + JSON.stringify(res.results))
      this.loading.dismiss();
      this.noshowlist = res.results;
      if(this.noshowlist=='')
      {
        this.norecord=true;
        this.showall=false;
      }
      else
      {
        this.norecord=false;
        this.showall=true;
      }
    }, err => {
      console.log(err);
      setTimeout(() => {
        this.loading.dismiss();
      }, 2000);
      this.presentAlert(err);
    });
  }

  Changedate() {
    console.log("date" + this.date)
    this.choosendate = new Date(this.date);
    this.startdate = new Date(this.choosendate.getFullYear(), this.choosendate.getMonth(), 1);
    this.enddate = new Date(this.choosendate.getFullYear(), this.choosendate.getMonth() + 1, 0);

    console.log(this.startdate + "------" + this.enddate)
    this.fromdate = formatDate(this.startdate, 'MM-dd-yyyy', 'en-US', '+0530');
    this.todate = formatDate(this.enddate, 'MM-dd-yyyy', 'en-US', '+0530');
    this.presentLoading();
    this.noshowservice.getNoShows(this.fromdate, this.todate).subscribe(res => {
      console.log("results are : " + JSON.stringify(res.results))
      this.loading.dismiss();
      this.noshowlist = res.results;
      if(this.noshowlist=='')
      {
        this.norecord=true;
        this.showall=false;
      }
      else
      {
        this.norecord=false;
        this.showall=true;
      }
    }, err => {
      console.log(err);
      setTimeout(() => {
        this.loading.dismiss();
      }, 2000);
      this.presentAlert(err);
    });
  }
  async presentAlert(alertmessage: string) {
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
