import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map'

import { HttpClientModule } from '@angular/common/http';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AngularFireDatabase , AngularFireList} from "angularfire2/database";
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import { AboutPage } from '../about/about';


// Firebase backend project: 
// https://console.firebase.google.com/u/0/project/mapd-db/database/mapd-db/data

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  creditCards: Observable<any>;
  headText: String;
  saveButtonText: String;

  _id: String;
  campaignID: String;
  nameOnCard: String;
  cardNumber: String;
  expiryDate: String;
  securityCode: String;
  postalCode: String;

  endpoint: string;

  constructor(public navCtrl: NavController, private http: HttpClient, public alertCtrl: AlertController) {
    this.endpoint = 'http://localhost:5000/creditcards';

    this.creditCards = this.http.get(this.endpoint);
    this.creditCards.subscribe(data => {
      
      if (data[0] == null) {

        this.headText = "Add Credit Card";
        this.saveButtonText = "Add";

        console.log('no data');

      } else {

        this.headText = "Edit Credit Card";
        this.saveButtonText = "Update";
        
        this._id = data[0]._id;
        this.campaignID = data[0].CampaignID;
        this.nameOnCard = data[0].NameOnCard;
        this.cardNumber = data[0].CardNumber;
        this.expiryDate = data[0].ExpiryDate;
        this.securityCode = data[0].SecurityCode;
        this.postalCode = data[0].PostalCode;

      }
    
    })
  }

  saveCard() {

    let dataCC = {
      CampaignID: this.campaignID,
      NameOnCard: this.nameOnCard,
      CardNumber: this.cardNumber,
      ExpiryDate: this.expiryDate,
      SecurityCode: this.securityCode,
      PostalCode: this.postalCode
    };

    if(this._id == null) {

      // Add
      const req = this.http.post(this.endpoint, dataCC)
      .subscribe(
        res => {
          //this.showConfirm('Success', 'Credit Card Added Successully', 'Okay', function() {

            this.navCtrl.push(AboutPage);
            console.log('goto view page now')
         //});
        },
        err => {
          
          this.showConfirm('Error', 'An error occurred while saving data', 'Okay', function(){ });

        }
      );
    } else {

      // Update
      const req = this.http.put(this.endpoint + '/' + this._id, dataCC)
      .subscribe(
        res => {

          if (res == true) {
           //this.showConfirm('Success', 'Credit Card information updated successully', 'Okay', function() {
                this.navCtrl.push(AboutPage);
                console.log('goto view page now')
             //});
          }

        },
        err => {
          this.showConfirm('Error', 'An error occurred while updating data', 'Okay', function(){ });          
        }
      );
      
    }

  }

  showConfirm(alertTitle, alertMessage, alertButtonText, alertHandler) {
    let confirm = this.alertCtrl.create({
      title: alertTitle,
      message: alertMessage,
      buttons: [
        {
          text: alertButtonText,
          handler: () => {
            alertHandler();
          }
        }
      ]
    });
    confirm.present();
  }
 
}