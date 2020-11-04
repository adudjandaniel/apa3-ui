import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PrototypeComponent } from './prototype/prototype.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'prototype', component: PrototypeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
