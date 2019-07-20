import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

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

  ngOnInit() {
    this.accordionview = [];
    this.options = [null];
    this.values = [];
    for (let i = 0; i < this.demo.length; i++) {
      this.accordionview.push(false);
      this.values.push(
        {
          select:'',
          date: new Date()
        }
      );
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

  continue()
  {
    this.route.navigate(['caregiver']);
  }

}
