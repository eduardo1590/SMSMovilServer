import { Component } from '@angular/core';
import { SMSi } from '../shared/sms.interface';
import { SmsServiceService } from '../sms-service.service';
import { SMS } from '@ionic-native/sms/ngx';

declare var SMSReceive: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private smsService: SmsServiceService, private sms: SMS) {
    /*let message = {
    ani: "04242462125",
    text: "esto es una prueba",
    date: new Date()};
    
    this.saveSms(message);*/
  }

  ngOnInit() {
     //this.sms.send(client, "Recibido");
    SMSReceive.startWatch(
      () =>{
        console.log('Esperando Mensajes');
        document.addEventListener('onSMSArrive', (e: any) => {
          console.log('onSMSArrive()');
          var IncomingSMS = e.data;
          console.log(JSON.stringify(IncomingSMS));
          this.processSMS(IncomingSMS);
        });
      }
    )
  }

  saveSms(sms: SMSi) {
    this.smsService.onSaveSms(sms, null)
  }

  processSMS(data: any){
      const message = data.body;
      const client = data.address;
  
      let sms = {
        ani: client,
        text: message,
        date: new Date()
      };
        //this.sms.send(client, "Recibido");
       this.saveSms(sms);
  }

}
