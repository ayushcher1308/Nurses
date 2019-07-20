import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  ngOnInit() {
    this.doctorSelected = [];
    this.finalSelection = [];
    if (localStorage.getItem("selectedDoc")) {
      this.doctorSelected = JSON.parse(localStorage.getItem("selectedDoc"));
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
        this.finalSelection.push(this.doctor[i])
      }
    }

    localStorage.setItem("doctor", JSON.stringify(this.finalSelection));
    localStorage.setItem("selectedDoc", JSON.stringify(this.doctorSelected));
    this.route.navigate(['review'])
  }

}
