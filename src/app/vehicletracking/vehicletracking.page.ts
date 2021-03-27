import { Component, OnInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Polyline,
  LatLng,
  Marker,
  Environment,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps/ngx';
import { Platform,AlertController,LoadingController,MenuController} from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { RestApiService } from '../rest-api.service';
declare var google:any;
@Component({
  selector: 'app-vehicletracking',
  templateUrl: './vehicletracking.page.html',
  styleUrls: ['./vehicletracking.page.scss'],
})
export class VehicletrackingPage implements OnInit {
  map: GoogleMap;
  private loading: any;
  latlang = [];
  current_lat:any;
  current_lng:any;
  routeNo :any;
  shiftTime:any;
  constructor( private platform:Platform,private locationservice: RestApiService,
    public loadingController: LoadingController,
    public alertController: AlertController,    
    public menu: MenuController,private geolocation: Geolocation) {  }

  async ngOnInit() {
    this.routeNo = localStorage.getItem('pickuprouteno');
    this.shiftTime = localStorage.getItem('pickupshift');
    this.geolocation.getCurrentPosition().then((resp) => {
      this.current_lat=resp.coords.latitude
      this.current_lng=resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
    await this.platform.ready();
   if(localStorage.getItem('routeassignedtoday') != null && localStorage.getItem('routeassignedtoday').length > 2 )
   {
    this.presentLoading();
    this.locationservice.getVehicleLocation(this.routeNo,this.shiftTime).subscribe(res => {
     /*  console.log("results are : " + JSON.stringify(res.results))
      console.log("results are : " + JSON.stringify(res.results.LatLngs)) */
      this.loading.dismiss();
      if( res.results.LatLngs != undefined)
      {
        this.latlang = res.results.LatLngs;
        this.loadMap();
      }
      else{
        this.presentAlert(res.results);
        this.loadMap();
      }
       
    }, err => {
      console.log(err);
      setTimeout(() => {
        this.loading.dismiss();
      }, 2000);
      this.presentAlert(err);
    });
  }
  else{
    this.loadMap();
    this.presentAlert("No Trips Today");
  }
    
  }
  ionViewWillEnter() {
    this.menu.swipeGesture(false);
 }
  loadMap() {
 

    // This code is necessary for browser
   Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyAEp4aSq9MKWM4YZVGkKiYf1fB__oVCRlk',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyAEp4aSq9MKWM4YZVGkKiYf1fB__oVCRlk'
    }); 

    /* let AIR_PORTS = [
      {lat:13.119511, lng:80.095418},
      {lat:13.126182, lng:80.120557},
      {lat:13.122449, lng:80.147091},
      {lat:13.115129, lng:80.147907},
      {lat:13.105417, lng:80.152428},
      {lat:13.101251, lng:80.161582},
      {lat:13.088779, lng:80.169717},
      {lat:13.088026, lng:80.184487},
      {lat:13.072878, lng:80.201304},

      {lat:13.055032, lng:80.211559},
      {lat:13.032187, lng:80.211525},
      {lat:13.011656, lng:80.203850},
      {lat:13.012496, lng:80.221201},
      {lat:13.006844, lng:80.246199},
      {lat:12.970832, lng:80.244726},
    ]; */
    var path = [];
    if(this.latlang.length>0)
    {
      console.log(this.latlang)
      for(var k = 0; k< this.latlang.length; k++) {
        path.push(new LatLng(parseFloat(this.latlang[k].Latitude), parseFloat(this.latlang[k].Longtitude)));
      }     
    }
    else{
      console.log(this.current_lat, this.current_lng)
      path.push(new LatLng(this.current_lat, this.current_lng));
    }
    
    console.log("Path defined as : " + path)
    this.map = GoogleMaps.create('map_canvas',{
    /*   camera: {
        target: path
      } */
      
    });
    this.goToMyLocation();
    
    let polyline: Polyline = this.map.addPolylineSync({
      points: path,
      color: '#AA00FF',
      width: 5,
      geodesic: true,
      clickable: true  // clickable = false in default
    });
    const icon = {
      url: 'assets/goeasymobile32.png', // image url
      scaledSize: new google.maps.Size(30, 30), // scaled size
    };
   
    let marker: Marker = this.map.addMarkerSync({
      position: path[path.length -1 ],
      title: "Driver Name, Driver Mobile No. ",
      disableAutoPan: true,
      icon:icon
    });
    /* polyline.on(GoogleMapsEvent.POLYLINE_CLICK).subscribe((params: any) => {
      let position: LatLng = <LatLng>params[0];

      let marker: Marker = this.map.addMarkerSync({
        position: position,
        title: position.toUrlValue(),
        disableAutoPan: true
      });
      marker.showInfoWindow();
    }); */
   
    for(var i = 0; i < (path.length - 1); i++) {
      //console.log(this.latlang[i].Latitude +"---"+ this.latlang[i].Longtitude + "-------->>dyamnic marker setting ")
     // path.push(new LatLng(parseFloat(this.latlang[i].Latitude), parseFloat(this.latlang[i].Longtitude)));
      let marker: Marker = this.map.addMarkerSync({
        position: path[i],
        title: path[i].toUrlValue(),
        disableAutoPan: true,
      });
      marker.showInfoWindow();
    }
  }
  goToMyLocation(){
    this.map.clear();
     // Get the location of you
     this.map.getMyLocation().then((location: MyLocation) => {
      console.log(JSON.stringify(location, null ,2));

      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 17,
        duration: 5000
      });
      const myicon = {
        url: 'assets/mapicon40.png', // image url
        scaledSize: new google.maps.Size(60, 60), // scaled size
      };
      //add a marker
      let marker: Marker = this.map.addMarkerSync({
        title: 'My location',
        snippet: 'My Current Location',
        position: location.latLng,
        animation: GoogleMapsAnimation.BOUNCE,
        icon:myicon
      });

      //show the infoWindow
      marker.showInfoWindow();
    })
    .catch(err => {
      //this.loading.dismiss();
      this.presentAlert(err.error_message);
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
