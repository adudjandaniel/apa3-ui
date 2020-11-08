import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrototypeComponent } from './Components/prototype/prototype.component';
import { HomeComponent } from './Components/home/home.component';
import { DriveComponent } from './Components/drive/drive.component';

@NgModule({
  declarations: [
    AppComponent,
    PrototypeComponent,
    HomeComponent,
    DriveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
