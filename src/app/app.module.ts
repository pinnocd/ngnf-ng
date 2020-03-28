import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// New
//import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from  '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { SuccessesComponent } from './successes/successes.component';
import { FeaturesComponent } from './features/features.component';
import { ActionComponent } from './action/action.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { NgnfComponent } from './ngnf/ngnf.component';
import { TopBarComponent } from './top-bar/top-bar.component';

// New
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';


/* const appRoutes: Routes = [
  { path: '/', component: NgnfComponent },
  { path: '/apply', component: ActionComponent }
]; */

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SuccessesComponent,
    FeaturesComponent,
    ActionComponent,
    BenefitsComponent,
    NgnfComponent,
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSliderModule,
    MatToolbarModule, 
    MatIconModule, 
    MatCardModule, 
    MatButtonModule, 
    MatGridListModule,
    MatTableModule,
    MatSidenavModule,
//    RouterModule.forRoot( appRoutes )
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
