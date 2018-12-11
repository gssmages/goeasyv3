import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mytrips',
  templateUrl: './mytrips.page.html',
  styleUrls: ['./mytrips.page.scss'],
})
export class MytripsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
}
}
