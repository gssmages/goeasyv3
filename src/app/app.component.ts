import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Globals } from './global';
import { Events } from '@ionic/angular';
import 'hammerjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

public appPages : Array<any> = []; 
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public globals: Globals,
    public events: Events
  ) {
    this.initializeApp();

    this.events.subscribe('user:login', (user) => { this.appPages = user; });
    if(localStorage.getItem('LocationName') =="Chennai" || localStorage.getItem('LocationName')=="Pune"){
      this.appPages=[
        {
          title: 'Home',
          url: '/home',
          icon: 'home'
        },
        {
          title: 'Adhoc Request',
          url: '/Adhocrequest',
          icon: 'time'
        },
          {
          title: 'My Trips',
          url: '/Mytrips',
          icon: 'pin'
        },
          {
          title: 'My Approvals',
          url: '/Myapprvaldashboard',
          icon: 'checkbox-outline'
        },
        {
          title: 'Feedback',
          url: '/feedback',
          icon: 'chatbubbles'
        }
      ];
    }
    else{
      this.appPages=[
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },    
      {
      title: 'My Approvals',
      url: '/Myapprvaldashboard',
      icon: 'checkbox-outline'
    }
  ];
}

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  reset()
  {
    localStorage.removeItem('empusername');
    localStorage.removeItem('emppassword');
    localStorage.removeItem('EmployeeID');
    localStorage.removeItem('LocationID');
    localStorage.removeItem('LocationName');
    localStorage.removeItem('displayname');
  }
}
