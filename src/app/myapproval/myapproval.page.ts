import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myapproval',
  templateUrl: './myapproval.page.html',
  styleUrls: ['./myapproval.page.scss'],
})

export class MyapprovalPage implements OnInit {
  checkboxchange:string ="";
  private status: boolean=false;
  private status_close: boolean=true;
  constructor() { }

  ngOnInit() {
  }
  

 selectall() {
  let list = [4, 5, 6];
  this.status=true;
  this.status_close=false;
  for (let i = 0; i < list.length; i++) {
   var id=i+1;
    var test = document.querySelector("#id"+id); 
   
   if(test.classList.contains("selected"))
   {
    console.log(test.title);
   }
   else{
    console.log(test.title);
    test.classList.add('selected');
   }
     // "0", "1", "2",
  }
    /*if(item1.nativeElement.classList.contains('open')) {
      this.doSomething();
    }*/
  } 
  deselectall() {
    let list = [4, 5, 6];
    this.status=false;
    this.status_close=true;
    for (let i = 0; i < list.length; i++) {
     var id=i+1;
      var test = document.querySelector("#id"+id); 
     
     if( test.classList.contains("selected"))
     {
      test.classList.remove('selected');
      console.log(test.title+"----removed");
     }
       // "0", "1", "2",
    }
      /*if(item1.nativeElement.classList.contains('open')) {
        this.doSomething();
      }*/
    } 
    approve() {
      let list = [4, 5, 6];
      for (let i = 0; i < list.length; i++) {
       var id=i+1;
        var test = document.querySelector("#id"+id); 
       
       if(test.classList.contains("selected"))
       {
        console.log(test.title);
       }
         // "0", "1", "2",
      }
      }  
  tapEvent(e) {
   console.log("card tapped ...")
   this.checkboxchange='<ion-icon name="calendar" style="font-size:32px;"></ion-icon>';
  }
  swiperightEvent($event)
  {
    console.log("card right swipped ...")
  }
  swipeleftEvent($event)
  {
    console.log("card left swipped ...")
  }
}
