import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { Globals } from './global';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { CodePush } from '@ionic-native/code-push/ngx';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { QrcodemodalComponent } from './qrcodemodal/qrcodemodal.component';
import { NgxQRCodeModule } from 'ngx-qrcode2'; 
@NgModule({
    declarations: [AppComponent,QrcodemodalComponent],
    entryComponents: [QrcodemodalComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        NgxQRCodeModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        Globals,
        AppVersion,      
        CodePush,
        GoogleAnalytics
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
