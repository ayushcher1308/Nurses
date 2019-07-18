import { Component, OnInit } from '@angular/core';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Nurses Online';
  demo = [1, 2, 3, 4, 4, 5, 6, 6];
  // test = 1;
  accordionview;
  options;

  ngOnInit() {
    this.accordionview = [];
    this.options = [];
    for (let i = 0; i < this.demo.length; i++) {
      this.accordionview.push(false);
    }
    for(let j=0;j<15;j++)
    {
      this.options.push(j+1+" hours");
    }
  }

  toggleAccordion(index, $event) {
    console.log($event);
   
      for (let i = 0; i < this.accordionview.length; i++) {
        if (i == index) {
          this.accordionview[i] = !this.accordionview[i];
        }
        else {
          this.accordionview[i] = false;
        }
    }
    // document.getElementById("container").style.transition = "visibility 0s linear 0.33s, opacity 0.33s linear;";
  }
  innerAccordion($event)
  {
      $event.preventDefault();
  }
}
