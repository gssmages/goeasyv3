import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-qrcodemodal',
  templateUrl: './qrcodemodal.component.html',
  styleUrls: ['./qrcodemodal.component.scss'],
})
export class QrcodemodalComponent implements OnInit {
  public qrcodevalue: string = '';
  constructor( public modalController: ModalController) { }

  ngOnInit() {
    this.qrcodevalue=localStorage.getItem('EmployeeID');    

  }
  async closeModal()
  {
    await this.modalController.dismiss("0");
  }
}
