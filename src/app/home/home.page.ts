import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
constructor(public storage: Storage) {}
  async setData(key, value) {
    const res = await this.storage.set(key, value);
    console.log(res);
  }
}
