import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Globals } from './global';
import { Events } from '@ionic/angular';
import 'hammerjs';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { CodePush, InstallMode, SyncStatus } from '@ionic-native/code-push/ngx';
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
    private codePush: CodePush
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
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkCodePush(); //Use the plugin always after platform.ready()
    });
  }
  checkCodePush() {
    
    this.codePush.sync({
    updateDialog: {
     appendReleaseDescription: true,
      descriptionPrefix: "\n\nChange log:\n"   
     },
     installMode: InstallMode.IMMEDIATE
  },(progress)=>{

  }).subscribe((status)=>{
    // if(status==SyncStatus.CHECKING_FOR_UPDATE)
    // alert("Checking for Update");
    if(status==SyncStatus.DOWNLOADING_PACKAGE)
    alert("Downloading Package");
    if(status==SyncStatus.IN_PROGRESS)
    alert("In Progress");
    if(status==SyncStatus.INSTALLING_UPDATE)
    alert("Installing update");
    // if(status==SyncStatus.UP_TO_DATE)
    // alert("Update Up-to-date");
    if(status==SyncStatus.UPDATE_INSTALLED)
    alert("Update Installed");
    if(status==SyncStatus.ERROR)
    alert("Error While Updating");
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
    localStorage.removeItem('emppassword');
    localStorage.removeItem('EmployeeID');
    localStorage.removeItem('LocationID');
    localStorage.removeItem('LocationName');
    localStorage.removeItem('displayname');
  }
}
