import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
    constructor(private router: Router,public alertController: AlertController){      
    }
    ngOnInit(){      
    }
    pushPage(){
        this.router.navigateByUrl('/home');
    }
    /*async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Goeasy Alert',
      message: 'Please enter username and password.',
      buttons: ['OK']
    });

    await alert.present();
  }*/
    
}
