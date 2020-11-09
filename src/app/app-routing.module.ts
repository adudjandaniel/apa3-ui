import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentComponent } from './Components/document/document.component';
import { DriveComponent } from './Components/drive/drive.component';
import { HomeComponent } from './Components/home/home.component';
import { PrototypeComponent } from './Components/prototype/prototype.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'prototype', component: PrototypeComponent },
  { path: 'drive', component: DriveComponent,
    children: [
      { path: ':id', component: DocumentComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
