import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgnfComponent } from './ngnf/ngnf.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', component: NgnfComponent },
  { path: 'dean', component: HomeComponent }
];

@NgModule({
  declarations: [
//    NgnfComponent,
//    HomeComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes)
    // CommonModule,
     ],
     exports: [RouterModule]
})

export class AppRoutingModule { }
