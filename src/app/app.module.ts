// Import Core angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from  '@angular/forms';
import { AuthguardGuard } from './authguard.guard';

// Add all fancy Taterial Modules
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';

// All our new infrastructure apps
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { matDialogComponent } from './matDialog/matDialog.component';

// Project Modules
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomeComponent } from './home/home.component';
import { SuccessesComponent } from './successes/successes.component';
import { FeaturesComponent } from './features/features.component';
import { ActionComponent } from './action/action.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { NgnfComponent } from './ngnf/ngnf.component';
import { ApplyComponent } from './apply/apply.component';
import { ReportComponent } from './report/report.component';
import { AppReportComponent } from './app-report/app-report.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Define all routes necessary
const appRoutes: Routes = [
  { path: '', component: NgnfComponent },
  { path: 'apply', component: ApplyComponent, canActivate: [AuthguardGuard] },
  { path: 'report', component: ReportComponent, canActivate: [AuthguardGuard] },
  { path: 'appReport', component: AppReportComponent, canActivate: [AuthguardGuard] },

  { path: 'login', component: LoginComponent },
//  { path: 'home', component: HomeComponent },
  { path: 'registration', component: RegisterComponent },
  { path: 'myaccount', component: DashboardComponent, canActivate: [AuthguardGuard] }

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SuccessesComponent,
    FeaturesComponent,
    ActionComponent,
    BenefitsComponent,
    TopBarComponent,
    NgnfComponent,
    ApplyComponent,
    ReportComponent,
    AppReportComponent,
    matDialogComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent    
    ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      MatSliderModule,
      MatToolbarModule, 
      MatIconModule, 
      MatCardModule, 
      MatButtonModule, 
      MatGridListModule,
      MatTableModule,
      MatSidenavModule,
      MatListModule,
      MatTabsModule,
      MatPaginatorModule,
      MatDialogModule,
      MatMenuModule,
      FlexLayoutModule,
      MatSelectModule,
      MatInputModule,
      MatExpansionModule,
      RouterModule.forRoot(appRoutes)
    ],
  exports: 
      [RouterModule],
  bootstrap: 
      [AppComponent],
  entryComponents:
      [matDialogComponent],
  providers: []
})

export class AppModule { }
