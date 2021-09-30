import { Component } from '@angular/core';
import { SMS } from '../shared/sms.interface';
import { SmsServiceService } from '../sms-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private smsService: SmsServiceService) {
    let sms = {
    ani: "04242462125",
    text: "esto es una prueba",
    date: new Date()};
    this.saveSms(sms);
  }

  saveSms(sms: SMS) {
    this.smsService.onSaveSms(sms, null)
  }

}
