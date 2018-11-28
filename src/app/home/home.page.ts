import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { RestApiService } from '../rest-api.service';
import { AlertController } from '@ionic/angular';

interface mydata
    {
        obj: Object;
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
    result :any=[];
    
   data1: Observable<any>;
    constructor(
    private homeservice :RestApiService,
     public loadingController: LoadingController,
     public route: ActivatedRoute,
     public router: Router,
     private http: HttpClient,
     public alertController: AlertController
    ) { }

    ngOnInit(){     
        this.homeservice.getData().subscribe(res => {
            console.log(res);
            this.result = res;
            console.log("results are : " + JSON.stringify(this.result))
        this.presentAlert();

        });
    }
    async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Goeasy Alert',
      message: JSON.stringify(this.result),
      buttons: ['OK']
    });

    await alert.present();
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
