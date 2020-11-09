import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrototypeComponent } from './Components/prototype/prototype.component';
import { HomeComponent } from './Components/home/home.component';
import { DriveComponent } from './Components/drive/drive.component';
import { DocumentComponent } from './Components/document/document.component';

@NgModule({
  declarations: [
    AppComponent,
    PrototypeComponent,
    HomeComponent,
    DriveComponent,
    DocumentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
