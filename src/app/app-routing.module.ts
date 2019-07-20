import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CareGiverComponent } from './care-giver/care-giver.component';
import { HomeComponent } from './home/home.component';
import { BookingreviewComponent } from './bookingreview/bookingreview.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
},
{
  path: 'home',
  component: HomeComponent,
  
},
{
  path:'caregiver',
  component:CareGiverComponent
},
{
  path:'review',
  component:BookingreviewComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
