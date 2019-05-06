import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import {formatDate } from '@angular/common';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  result :any;
  private loading: any;
  requestforlist:any;
  questionlist:any;
  today= new Date();
  mindate= new Date();
  dbdate='';
  minformatDate='';
  minDate=this.mindate.setMonth(this.mindate.getMonth()-2);

  feedbackfor:any;
  traveldate:any;
  category:any;
  comments:any='';

  constructor(
    private feedbackservice :RestApiService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private ga: GoogleAnalytics) { }

  ngOnInit() {
    this.ga.trackView('Feedback Page').then(() => {}).catch(e => console.log(e));

    this.dbdate = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
    this.minformatDate =formatDate(this.minDate, 'yyyy-MM-dd', 'en-US', '+0530');

    this.traveldate=formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
    console.log(this.dbdate+"---"+this.minformatDate)
    this.presentLoading();
    this.feedbackservice.getFeedbackData().subscribe(res => {
      this.loading.dismiss();
      console.log(res);
     // console.log("results are : " + JSON.stringify(res))
      this.requestforlist=res.results.ReqForList;
      this.questionlist=res.results.QuestionList;
    }, err => {            
      console.log(err);
      this.loading.dismiss();
      this.presentAlert(err);           
  });
  }
  validateRequest()
  {
    console.log("click the Submit button")
    if(this.traveldate && this.feedbackfor && this.category && this.comments)
    {
      
      console.log(this.feedbackfor+"--"+this.traveldate+"--"+this.category+"--"+this.comments) 
      this.submitRequest();   
    }
    else
    {
      this.presentAlert('Please select all the required field.');
    }    
  }
  submitRequest()
  {
    console.log("submit request")
    var traveldateformat=formatDate(new Date(this.traveldate), 'MM-dd-yyyy', 'en-US', '+0530');
    this.presentLoading();
        this.feedbackservice.saveFeedback(this.category,this.comments,traveldateformat,this.feedbackfor).subscribe(res => { 
           console.log("results are : " + JSON.stringify(res.results))
            this.loading.dismiss();
            this.presentAlert(res.results);
            this.reset();
        }, err => {            
            console.log(err);
            this.loading.dismiss();
            this.presentAlert(err);           
        });
  }
  reset()
  {
    this.category='';
    this.comments='';
    this.traveldate=formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
    this.feedbackfor='';
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
