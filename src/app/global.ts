import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
@Injectable()
export class Globals {
  displayname: string;
  businesstitle: string;
  appversion: string;

  private appPages = new Subject<any>();

  publishAppPages(data: any) {
      this.appPages.next(data);
  }

  getObservable(): Subject<any> {
    return this.appPages;
}
}