import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { CareGiverComponent } from './care-giver/care-giver.component';
import { HomeComponent } from './home/home.component';
import { BookingreviewComponent } from './bookingreview/bookingreview.component';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';




@NgModule({
  declarations: [
    AppComponent,
    CareGiverComponent,
    HomeComponent,
    BookingreviewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularDateTimePickerModule,
    NgxCarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
