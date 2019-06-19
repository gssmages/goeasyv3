import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Globals } from './global';
import { Events } from '@ionic/angular';
import 'hammerjs';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { CodePush, InstallMode, SyncStatus } from '@ionic-native/code-push/ngx';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  protected app_version: any;

public appPages : Array<any> = []; 
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public globals: Globals,
    public events: Events,
    private appVersion: AppVersion,
    private codePush: CodePush,
    private ga: GoogleAnalytics,
    private router: Router,
  ) {
    this.initializeApp();
  
    this.appVersion.getVersionNumber().then(value => {
      this.app_version = value;      
    }).catch(err => {
      console.log(err)
    });
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
      //this.statusBar.styleDefault();
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.checkCodePush(); //Use the plugin always after platform.ready()
      this.ga.startTrackerWithId('UA-51333248-11') //UA-51333248-11 is bala google id //UA-63736036-2 is magesh google id 
      .then(() => {}).catch(e => alert('Error starting GoogleAnalytics == '+ e));
    });
  }
  checkCodePush() {
    localStorage.setItem("updatemsg","");
        this.codePush.sync({
   /*  updateDialog: {
     appendReleaseDescription: true,
      descriptionPrefix: "\n\nChange log:\n"   
     }, */
     installMode: InstallMode.IMMEDIATE
  },(progress)=>{

  }).subscribe((status)=>{
    // if(status==SyncStatus.CHECKING_FOR_UPDATE)
    // alert("Checking for Update");
    if(status==SyncStatus.DOWNLOADING_PACKAGE)
    {
      this.router.navigate(['/update']);
      localStorage.setItem("updatemsg","Downloading Package");
    }
    //alert("Downloading Package");
    if(status==SyncStatus.IN_PROGRESS)
    {
      localStorage.setItem("updatemsg","Please wait..<br>App is updating");
    }
    //alert("In Progress");
    if(status==SyncStatus.INSTALLING_UPDATE)
    localStorage.setItem("updatemsg","Installing update");
    //alert("Installing update");
    // if(status==SyncStatus.UP_TO_DATE)
    // alert("Update Up-to-date");
    if(status==SyncStatus.UPDATE_INSTALLED)
    localStorage.setItem("updatemsg","Update Installed");
    //alert("Update Installed");
    if(status==SyncStatus.ERROR)
    localStorage.setItem("updatemsg","Error While Updating");
    //alert("Error While Updating");
  }
    // (data) => {
    //  console.log('CODE PUSH SUCCESSFUL: ' + data);
     
    // },
    // (err) => {
    //  console.log('CODE PUSH ERROR: ' + err);
     
    // }
  );
 }
  reset()
  {
    localStorage.removeItem('empusername');
    localStorage.removeItem('empsecurecode');
    localStorage.removeItem('EmployeeID');
    localStorage.removeItem('LocationID');
    localStorage.removeItem('LocationName');
    localStorage.removeItem('displayname');
    localStorage.removeItem('EmployeeMailID');
    localStorage.removeItem('Postalcode');
    localStorage.removeItem('Grade');
    localStorage.removeItem('Regular');
    localStorage.removeItem('SupervisorID');
    localStorage.removeItem('SupervisorName');
    localStorage.removeItem('SupervisorMailID');
  }
}
