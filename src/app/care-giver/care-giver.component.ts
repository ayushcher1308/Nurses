import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxCarousel } from 'ngx-carousel';


@Component({
  selector: 'app-care-giver',
  templateUrl: './care-giver.component.html',
  styleUrls: ['./care-giver.component.css']
})
export class CareGiverComponent implements OnInit {

  constructor(private route: Router) { }

  doctor = [
    {
      type: 'Cardiologist',
      name: 'Dr. Darsini Norton',
      rating: '4.5',
      degree: 'MBBS, MD',
      medicine: 'General Medicine',
      fee: '199'
    },
    {
      type: 'Psychologist',
      name: 'Dr. Hattie Rodrique',
      rating: '4.1',
      degree: 'MBBS, MD',
      medicine: 'General Medicine',
      fee: '299'
    },
    {
      type: 'Psyiotherapist',
      name: 'Dr. Sarah Water',
      rating: '3.5',
      degree: 'MBBS, MD',
      medicine: 'General Medicine',
      fee: '99'
    },
    {
      type: 'Psycologist',
      name: 'Dr. Mittie Cooper',
      rating: '3.0',
      degree: 'MBBS, MD',
      medicine: 'General Medicine',
      fee: '199'
    },
    {
      type: 'Cardiologist',
      name: 'Dr. Willie Stone',
      rating: '4.5',
      degree: 'MBBS, MD',
      medicine: 'General Medicine',
      fee: '299'
    },
    {
      type: 'Psychologist',
      name: 'Dr. Dollie Norton',
      rating: '4.1',
      degree: 'MBBS, MD',
      medicine: 'General Medicine',
      fee: '399'
    },
  ]

  doctorSelected;
  finalSelection;
  compulsary:boolean = false;
  public carouselOne: NgxCarousel;

  public myfunc(event: Event) {
    // carouselLoad will trigger this funnction when your load value reaches
    // it is helps to load the data by parts to increase the performance of the app
    // must use feature to all carousel
 }

  ngOnInit() {
    this.doctorSelected = [];
    this.finalSelection = []; 
    this.carouselOne = {
      grid: {xs: 1, sm: 2, md:3, lg: 3, all: 0},
      slide: 2,
      speed: 400,
      interval: 4000,
      point: {
        visible: false
      },
      load: 2,
      touch: true,
      loop: false,
      custom: 'banner'
    }

    if (sessionStorage.getItem("selectedDoc")) {
      this.doctorSelected = JSON.parse(sessionStorage.getItem("selectedDoc"));
    }
    else {
      for (let i = 0; i < this.doctor.length; i++) {
        this.doctorSelected.push(false);
      }
    }
  }

  selectDoctor(index) {
    this.doctorSelected[index] = !this.doctorSelected[index];
  }

  continue() {
    for (let i = 0; i < this.doctorSelected.length; i++) {
      if (this.doctorSelected[i]) {
        this.finalSelection.push(this.doctor[i]);
        this.compulsary = true;
      }
    }
    if(this.compulsary)
    {
      sessionStorage.setItem("doctor", JSON.stringify(this.finalSelection));
    sessionStorage.setItem("selectedDoc", JSON.stringify(this.doctorSelected));
    sessionStorage.setItem("demo",JSON.stringify(this.doctorSelected));
    this.route.navigate(['review'])
  }
  else{
    alert("Please select Doctor");
  }
  }

  back()
  {
    this.route.navigate(['home']);
  }

}
