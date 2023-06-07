import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrokerComponent } from './broker/broker.component';
import { DeveloperComponent } from './developer/developer.component';
import { CreateBrokerComponent } from './broker/create-broker/create-broker.component';
import { BrokerDetailComponent } from './broker/broker-detail/broker-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { BrokerStartComponent } from './broker/broker-start/broker-start.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BrokerComponent,
    DeveloperComponent,
    CreateBrokerComponent,
    BrokerDetailComponent,
    BrokerStartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
