import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfilComponent } from './components/profil/profil.component';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    HomeComponent,
    HeaderComponent,
    ProfilComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
