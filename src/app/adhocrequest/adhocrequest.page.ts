import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
@Component({
  selector: 'app-adhocrequest',
  templateUrl: './adhocrequest.page.html',
  styleUrls: ['./adhocrequest.page.scss'],
})
export class AdhocrequestPage implements OnInit {
  requesttype:any;
  today= new Date();
  maxdate= new Date();
  jstoday = '';
  dbdate='';
  maxformatDate='';
  maxDate=this.maxdate.setMonth(this.maxdate.getMonth()+2);
  constructor() { 
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    this.dbdate = formatDate(this.today, 'yyyy-MM-dd', 'en-US', '+0530');
    this.maxformatDate =formatDate(this.maxDate, 'yyyy-MM-dd', 'en-US', '+0530');
    console.log("today date-->"+this.dbdate);
    console.log("today date-->"+this.maxformatDate);
  }

  ngOnInit() {
    this.requesttype = [
      {
        id: '8f8c6e98',
        name: 'USA',
        code: 'USD'
      },
      {  
        id: '169fee1a',
        name: 'Canada',
        code: 'CAD'
      },
      {
        id: '3953154c',
        name: 'UK',
        code: 'GBP'
      },
      {
        id: '68c61e29',
        name: 'UK',
        code: 'GBP'
      }
  ];
  }
  reqtype: string = '';
  reset()
  {
    console.log("click the reset button")
  }
  submitRequest()
  {console.log("click the Submit button------> selected id ----> "+this.reqtype)

  }

}
