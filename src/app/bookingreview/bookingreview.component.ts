import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookingreview',
  templateUrl: './bookingreview.component.html',
  styleUrls: ['./bookingreview.component.css']
})
export class BookingreviewComponent implements OnInit {

  constructor(private route:Router) { }
  Caregiver;
  totalgiver;
  totalcost=0;

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
