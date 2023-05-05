import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { HelpComponent } from './components/help/help.component';
import { ProfilComponent } from './components/profil/profil.component';

const routes: Routes = [
  {path:'',component:AdminDashboardComponent, children:[
      {path:'home',component: HomeComponent},
      {path:'help',component: HelpComponent},
      {path:'profil',component: ProfilComponent},
      {path:'', redirectTo: '/admin/home',pathMatch:'full'},


    ],
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
