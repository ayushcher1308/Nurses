import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
declare let paypal: any;
import SimpleCrypto from "simple-crypto-js";

@Component({
  selector: 'app-bookingreview',
  templateUrl: './bookingreview.component.html',
  styleUrls: ['./bookingreview.component.css']
})
export class BookingreviewComponent implements OnInit,AfterViewChecked {

  constructor(private route:Router) { }
  Caregiver;
  totalgiver;
  totalcost=0;
  addScript: boolean = false;
  paypalLoad: boolean = true;
  servicesSelected;
  finalAmount: number = 1;
  totalHours=0;
  totalServices;
  _secretKey = "some-unique-key";
  simpleCrypto = new SimpleCrypto(this._secretKey);

  paypalConfig = {
    env: 'sandbox',
    style: {
      size: 'large',
      color: 'blue',
      shape: 'pill',
      label: 'buynow',
      tagline: 'true',
      branding:'true'
     },
    client: {
      sandbox: 'AYdF_CLG3WQax3YkF73pVcoGNjuXBMv24OXS0boB_4BIAWWOP1Nr_ny1ydETiIwybb0D5KIDPJkdnnIX',
      production: 'AYdF_CLG3WQax3YkF73pVcoGNjuXBMv24OXS0boB_4BIAWWOP1Nr_ny1ydETiIwybb0D5KIDPJkdnnIX'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.totalcost, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
        alert("Transaction Completed");
      })
    },
    onCancel: () => {
      alert("Payment Cancelled");
    },
  };

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }
  
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
      // document.getElementById("script").style.color= 'blue';
    })
  }

  ngOnInit() {
    if(sessionStorage.getItem("doctor"))
    {
        // this.Caregiver = JSON.parse(sessionStorage.getItem("doctor"));
        let data =JSON.parse(sessionStorage.getItem("doctor"));
        let finalData = [];
        console.log(data);
        
        for(let i=0;i<data.length;i++)
        {
          finalData.push({degree: this.simpleCrypto.decrypt(data[i].degree),
            fee: this.simpleCrypto.decrypt(data[i].fee),
            medicine: this.simpleCrypto.decrypt(data[i].medicine),
            name: this.simpleCrypto.decrypt(data[i].name),
            rating: this.simpleCrypto.decrypt(data[i].rating),
            type: this.simpleCrypto.decrypt(data[i].type)})
        }
        this.Caregiver = finalData;
        console.log(this.Caregiver)
    }

    if(sessionStorage.getItem("services"))
    {
        let data =JSON.parse(sessionStorage.getItem("services"));
        let finalData = [];
        for(let i=0;i<data.length;i++)
        {
          finalData.push({
            select:this.simpleCrypto.decrypt(data[i].select),
            date:this.simpleCrypto.decrypt(data[i].date),
            service:this.simpleCrypto.decrypt(data[i].service)
          })
        }

        this.servicesSelected = finalData;
    }
    this.totalgiver = this.Caregiver.length;
    console.log(this.Caregiver);
    for(let i=0;i<this.Caregiver.length;i++)
    {
      this.totalcost = this.totalcost + parseInt(this.Caregiver[i].fee);
    }

    this.totalServices = this.servicesSelected.length;

    for(let i=0;i<this.servicesSelected.length;i++)
    {
        let hour = this.servicesSelected[i].select.replace(' hours','');
        this.totalHours = this.totalHours + parseInt(hour);
    }
  }

  edit(page:string)
  {
      this.route.navigate([page]);
  }

}
