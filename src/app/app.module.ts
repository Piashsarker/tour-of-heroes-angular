import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HeroesComponent } from './heroes/heroes.component';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroService } from './hero.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './/app-routing.module';
import {RouterModule} from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
  BrowserModule,
  FormsModule,
  AppRoutingModule,
],
providers: [
  HeroService,
  MessageService
],
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
