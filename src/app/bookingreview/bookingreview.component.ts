import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
declare let paypal: any;

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
  
  finalAmount: number = 1;

  paypalConfig = {
    env: 'sandbox',
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
    }
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
      // document.getElementById("script").style.color = 'silver';
    })
  }

  ngOnInit() {
    if(localStorage.getItem("doctor"))
    {
        this.Caregiver = JSON.parse(localStorage.getItem("doctor"));
    }
    this.totalgiver = this.Caregiver.length;
    console.log(this.Caregiver);
    for(let i=0;i<this.Caregiver.length;i++)
    {
      this.totalcost = this.totalcost + parseInt(this.Caregiver[i].fee);
    }
  }

  edit(page:string)
  {
      this.route.navigate([page]);
  }

}
