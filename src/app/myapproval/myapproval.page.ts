import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myapproval',
  templateUrl: './myapproval.page.html',
  styleUrls: ['./myapproval.page.scss'],
})
export class MyapprovalPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  tapEvent(e) {
   console.log("card tapped ...")
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
