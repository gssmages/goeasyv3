import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-myapprovalcip',
  templateUrl: './myapprovalcip.page.html',
  styleUrls: ['./myapprovalcip.page.scss'],
})
export class MyapprovalcipPage implements OnInit {

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
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.presentLoading();
    this.approvalservice.getMyApprovalCIPData().subscribe(res => {
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
    submitrequest(approvetype:string) {
      this.selectedrequest=[];
      if(this.selectthis.length!=0)
      {      
        for (let i = 0; i < this.myapprovallist.length; i++) {
          if(this.selectthis[i]==true)
            {
              this.selectedrequest.push(this.myapprovallist[i].ID)
              console.log(this.selectthis[i]);
            }        
        }
        if(approvetype=="approve")
        {
          console.log(approvetype);
          console.log(this.selectedrequest);
          this.showPrompt("approve");
        }
        else
        {
          console.log(approvetype);
          console.log(this.selectedrequest);
          this.showPrompt("reject");
        }       
      }
      else
      {
        console.log("please select the request to Approve/Reject");
        this.presentAlert("Please select the request to Approve/Reject");   
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

  async showPrompt(approvetype:string) {
    const prompt =await this.alertController.create({
      header: 'Approve/Reject Comments',
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
            if(approvetype=="approve")
            { 
              this.status=2;
              this.cabRequestID=this.selectedrequest;
              this.approver=localStorage.getItem('EmployeeID');
              this.remarks=data.comments;
              this.saveApprovals(this.status,this.cabRequestID,this.approver,this.remarks)
            }
            else{
              if(data.comments=="")
              {
                prompt.message="Enter Comments<br><span style='color:red'> Please enter comments</span>"; 
                return false;
              }
              else{
                  this.status=3;
                  this.cabRequestID=this.selectedrequest;
                  this.approver=localStorage.getItem('EmployeeID');
                  this.remarks=data.comments;
                  this.saveApprovals(this.status,this.cabRequestID,this.approver,this.remarks);  
              }
            }
            
          }
        }
      ]
    });
    await prompt.present();
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
  saveApprovals(status:string, cabrequestid:string, approver:string,remarks:string)
  {
     this.presentLoading();
        this.approvalservice.saveMyApprovalCIP(cabrequestid, remarks,status,approver).subscribe(res => { 
            console.log("results are : " + JSON.stringify(res.results))
            this.loading.dismiss();
            this.presentAlert(res.results);  
            window.location.reload();
        }, err => {            
            console.log(err);
            this.loading.dismiss();
            this.presentAlert(err);           
        });
  }

}
