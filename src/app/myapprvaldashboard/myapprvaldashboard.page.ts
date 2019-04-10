import { Component, OnInit } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-myapprvaldashboard',
  templateUrl: './myapprvaldashboard.page.html',
  styleUrls: ['./myapprvaldashboard.page.scss'],
})
export class MyapprvaldashboardPage implements OnInit {

  constructor(
    private ga: GoogleAnalytics
  ) { }

  ngOnInit() {
    this.ga.trackView('My Approval Dashboard Page').then(() => {}).catch(e => console.log(e));
  }

}
