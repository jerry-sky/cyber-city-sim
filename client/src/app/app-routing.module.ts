import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { CityViewComponent } from './city-view/city-view.component';
import { MessageboxComponent } from './messagebox/messagebox.component';


import { LoginComponent } from './login/login.component'
import { MapViewComponent } from './map-view/map-view.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'map', component: MapViewComponent, /*canActivate: [AuthGuardService]*/ },
    { path: 'city/:username', component: CityViewComponent },
    { path: 'messagebox', component: MessageboxComponent },
    { path: '',   redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
