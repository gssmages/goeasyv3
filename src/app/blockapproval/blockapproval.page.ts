import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';

@Component({
  selector: 'app-blockapproval',
  templateUrl: './blockapproval.page.html',
  styleUrls: ['./blockapproval.page.scss'],
})
export class BlockapprovalPage implements OnInit {

  checkboxchange:string ="";
  private status: any;
  private cabRequestID:any;
  private approver: any;
  private remarks: any;
  private loading: any;
  myapprovallist:any;
  selectthis: Array<boolean> = []; selectedrequest: Array<string> = [];
  constructor(
    private approvalservice :RestApiService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private router: Router,
    private ga: GoogleAnalytics) { }

  ngOnInit() {
    this.ga.trackView('My Approvals Page').then(() => {}).catch(e => console.log(e));

    this.presentLoading();
    this.approvalservice.getMyBlockApprovalData().subscribe(res => {
      this.loading.dismiss();
      console.log(res);
     // console.log("results are : " + JSON.stringify(res))
     this.myapprovallist=res.results;
    }, err => {            
      console.log(err);
      this.loading.dismiss();
      this.presentAlert(err);           
  });
  }
  

 selectall() {
  // console.log(this.myapprovallist.length)
  //console.log(this.selectthis)
  if(this.myapprovallist.length!=0)
  { 
  this.selectthis=[];
  for (let i = 0; i < this.myapprovallist.length; i++) {
   var id=i+1;
   this.selectthis.push(true);
   // var test = document.querySelector("#id"+id); 
   
   /*if(test.classList.contains("selected"))
   {
    console.log(test.getAttribute('title'));
   }
   else{
    console.log(test.getAttribute('title'));
    test.classList.add('selected');
   }*/
     // "0", "1", "2",
  }
}
  else
  {
    console.log("No request to select");
    this.presentAlert("No request to select");   
  }
    /*if(item1.nativeElement.classList.contains('open')) {
      this.doSomething();
    }*/
  
      //console.log(this.selectthis)
  } 
  deselectall() {
    this.selectthis=[];
    console.log(this.selectthis)   
    } 
    submitrequest() {
      this.selectedrequest=[];
      console.log(this.selectthis);
      console.log(this.selectedrequest);
      if(this.myapprovallist.length!=0)
      {      
        for (let i = 0; i < this.myapprovallist.length; i++) {
          if(this.selectthis[i]==true)
            {
              this.selectedrequest.push(this.myapprovallist[i].LoggedInEmployeeID)
              console.log(this.selectthis[i]);
            }        
        }
        if(this.selectedrequest.length!=0)
        { 
             console.log(this.selectedrequest);
             this.showPrompt();           
       }  
       else
       {
         console.log("please select the request to Approve");
         this.presentAlert("Please select the request to Approve");   
       }  
      }
      else
      {
        console.log("No request to select");
        this.presentAlert("No request to select");   
      }
      //console.log(this.selectedrequest);
      }  
     /* activateClass($index:any){
        this.status = !this.status;
      }
  tapEvent(e) {
   console.log("card tapped ...")
  }*/
  swiperightEvent($event,i:any)
  {
    console.log("card right swipped ..."+i)
    this.selectthis[i]=!this.selectthis[i];
  }
  swipeleftEvent($event,i:any)
  {
    console.log("card left swipped ..."+i)
    this.selectthis[i]=!this.selectthis[i];
  }

  async showPrompt() {
    const prompt =await this.alertController.create({
      header: 'Approve Comments',
      message: "Enter Comments",
      inputs: [
        {
          name: 'comments',
          placeholder: 'Enter Comments'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked-->'+ data);
            console.log(JSON.stringify(data));            
              if(data.comments=="")
              {
                prompt.message='Enter Comments<br><span class="alertmsg"> Please enter comments</span>'; 
                return false;
              }
              else{
                  this.cabRequestID=this.selectedrequest;
                  this.remarks=data.comments;
                  console.log( this.cabRequestID + "--"+ this.remarks)
                  this.saveApprovals(this.cabRequestID,this.remarks);  
              }            
          }
        }
      ]
    });
    await prompt.present();
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
  saveApprovals(cabrequestid:string,remarks:string)
  {
     this.presentLoading();
        this.approvalservice.saveUnblockEmployees(cabrequestid, remarks).subscribe(res => { 
            console.log("results are : " + JSON.stringify(res.results))
            this.loading.dismiss();
            this.presentAlert(res.results[0].ErrorDesc);  
            window.location.reload();
        }, err => {            
            console.log(err);
            this.loading.dismiss();
            this.presentAlert(err);           
        });
  }

}
