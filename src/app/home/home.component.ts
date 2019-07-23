import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import SimpleCrypto from "simple-crypto-js";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ height: 0, opacity: 0 }),
            animate('0.4s ease-out', 
                    style({ height: 150, opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ height: 180, opacity: 1 }),
            animate('0.4s ease-in', 
                    style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class HomeComponent implements OnInit {

  constructor(private route:Router)
  {}
  title = 'Nurses Online';
  // date;
    settings = {
        bigBanner: true,
        timePicker: true,
        format: 'dd-MMM-yyyy hh:mm',
        defaultOpen: false,
        closeOnSelect:true
    }
  demo = [1, 2, 3, 4, 4, 5, 6, 6];
  services=['psyotherapy','massage','pedicure','treatment','manicure','hair styling']
  // test = 1;
  accordionview;
  options;
  values;
  servicesSelected;
  compulsary:boolean = false;
   _secretKey = "some-unique-key";
    simpleCrypto = new SimpleCrypto(this._secretKey);
  

  ngOnInit() {

    this.accordionview = [];
    this.servicesSelected =[];
    this.options = [null];
    this.values = [];
    if(sessionStorage.getItem("Accordion"))
    {
      this.accordionview = JSON.parse(sessionStorage.getItem("Accordion"));
    }
    if(sessionStorage.getItem("values"))
    {
      let data = JSON.parse(sessionStorage.getItem("values"));
      let finalData = [];
      for(let j=0;j<data.length;j++)
      {
        finalData.push({
          date:this.simpleCrypto.decrypt(data[j].date),
          select:this.simpleCrypto.decrypt(data[j].select)
        })
      }
      this.values = finalData;
      console.log(this.values);
    }
    else
    {
      for (let i = 0; i < this.demo.length; i++) {
      this.accordionview.push(false);
      this.values.push(
        {
          select:'',
          date: new Date()
        }
      );
    }
  }
    for(let j=0;j<15;j++)
    {
      this.options.push(j+1+" hours");
    }
  }

  toggleAccordion(index, $event) {
   
      for (let i = 0; i < this.accordionview.length; i++) {
        if (i == index) {
          this.accordionview[i] = !this.accordionview[i];
        }
        else {
          this.accordionview[i] = false;
        }
    }
    console.log(this.values);
    // document.getElementById("container").style.transition = "visibility 0s linear 0.33s, opacity 0.33s linear;";
  }

  unselect(index)
  {
    this.values[index].select = '';
    // this.values[index].date = '';
    window.event.stopPropagation();
  }

  prevent()
  {
    window.event.stopPropagation();
  }

  continue()
  {
    for(let i=0;i<this.values.length;i++)
    {
      if(this.values[i].select!='' && this.values[i].date != '')
      {
          this.servicesSelected.push({
            select:this.simpleCrypto.encrypt(this.values[i].select),
            date:this.simpleCrypto.encrypt(this.values[i].date),
            service:this.simpleCrypto.encrypt(this.services[i])
          });
          this.compulsary = true;

      }
    }
    if(this.compulsary)
    {
      let finalVal=[]
      for(let i=0;i<this.values.length;i++)
      {
        finalVal.push({
          date:this.simpleCrypto.encrypt(this.values[i].date),
          select:this.simpleCrypto.encrypt(this.values[i].select)
        })
      }
      sessionStorage.setItem("values",JSON.stringify(finalVal));
    sessionStorage.setItem("services",JSON.stringify(this.servicesSelected));
    sessionStorage.setItem("Accordion",JSON.stringify(this.accordionview));
    console.log(this.servicesSelected);
    this.route.navigate(['caregiver']);
  }
  else
  {
    alert("Please Select Service");
  }
  }

}
