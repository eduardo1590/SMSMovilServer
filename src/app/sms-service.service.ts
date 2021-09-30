import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SMS } from './shared/sms.interface';

@Injectable({
  providedIn: 'root'
})
export class SmsServiceService {
  sms: Observable<SMS[]>;

  private smsCollection: AngularFirestoreCollection<SMS>;

  constructor(private readonly afs: AngularFirestore) {
    this.smsCollection = afs.collection<SMS>('sms');
    this.getSMS();
   }

   onSaveSms(text: SMS, smsId:string): Promise<void>{
     return new Promise( async (resolve, reject) => {
       try{
        const id = smsId || this.afs.createId();
        const data = { id, ...text};
        const result = await this.smsCollection.doc(id).set(data);
        resolve(result)
       } catch (err) {
         reject(err.message);
       }
     })
   }

   private getSMS(): void{
     this.sms = this.smsCollection.snapshotChanges().pipe(
       map(actions => actions.map(a => a.payload.doc.data() as SMS))
     )
   }
}
