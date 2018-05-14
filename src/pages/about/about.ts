import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home'

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  creditCards: Observable<any>;

  _id: String;
  campaignID: String;
  nameOnCard: String;
  cardNumber: String;
  expiryDate: String;
  securityCode: String;
  postalCode: String;
  showCardInfoSection: boolean;

  endpoint: string;
  
  constructor ( public modalCtrl: ModalController, public navCtrl: NavController, private http: HttpClient) {
    this.endpoint = 'http://localhost:5000/creditcards';

    this.creditCards = this.http.get(this.endpoint);
    this.creditCards.subscribe(data => {
      
      console.log('data');
      console.log(data);
      if (data[0] != null) {
        this.showCardInfoSection = true;

        this._id = data[0]._id;
        this.campaignID = data[0].CampaignID;
        this.nameOnCard = data[0].NameOnCard;
        this.cardNumber = data[0].CardNumber;
        this.expiryDate = data[0].ExpiryDate;
        this.securityCode = data[0].SecurityCode;
        this.postalCode = data[0].PostalCode;

      } else {
        this.showCardInfoSection = false;
      }
    
    })
  }

  home() {
    this.navCtrl.push(HomePage)
  }
}