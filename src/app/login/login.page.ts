import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { Events } from '@ionic/angular';
import { AppVersion } from '@ionic-native/app-version/ngx';
@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

    username:string="";
    password:string="";
    sso_username:string="";
    sss_password:string="";
    uservalid:any;
    private loading: any;
    protected app_version: any;
    public appPages : Array<any> = []; 


    constructor( private loginservice :RestApiService,
        private router: Router,
        public alertController: AlertController,
        public loadingController: LoadingController,
        public events: Events,
        private appVersion: AppVersion
        ){      
          this.appVersion.getVersionNumber().then(value => {
            this.app_version = value;      
          }).catch(err => {
            console.log(err)
          });
    }
    ngOnInit(){ 
        this.reset(); 
       
        if(localStorage.getItem('empusername')!=null)
        {
            console.log(localStorage.getItem('empusername')+"----from SSO----"+localStorage.getItem('emppassword'))   
            this.sso_username=localStorage.getItem('empusername')
            this.sss_password=localStorage.getItem('emppassword')
            this.loginuser(this.sso_username,this.sss_password);
        }
    }
    pushPage(){        
        console.log(this.username +"--------"+this.password)
        if(this.username!='' && this.password!='')
        {
            console.log(this.username +"--------"+this.password)
            this.loginuser(this.username,this.password);            
        }
        else{
            this.presentAlert("Please enter username and password");
        }    
    }
    

    loginuser(user:string, pass:string)
    {
     
       
        this.presentLoading();
        console.log(user+"----from SSO----"+pass)
        this.loginservice.getLoginData(user, pass).subscribe(res => { 
            
            console.log("results are : " + JSON.stringify(res))
            this.uservalid=res.results.IsValid;
            if(this.uservalid)
            {
                this.loading.dismiss();
                localStorage.setItem('empusername', user);
                localStorage.setItem('emppassword', pass);
                localStorage.setItem('EmployeeID', res.results.EmployeeID);
                localStorage.setItem('LocationID', res.results.LocationID);
                localStorage.setItem('LocationName',res.results.LocationName);
                this.router.navigate(['/home']);


                /*******menu update ************************** */
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
              this.events.publish('user:login', this.appPages);
            }
            else
            {
                this.loading.dismiss();
                this.presentAlert(res.results);
                this.router.navigate(['/Login']);
            }
            
            this.reset();
        }, err => {            
            console.log(err);
            this.loading.dismiss();
            this.presentAlert(err);           
        });
    }
    async presentAlert(alertmessage:string) {
    const alert = await this.alertController.create({
      header: 'Goeasy Alert',
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

  reset()
  {
    this.username='';
    this.password=''
  }
    
}
