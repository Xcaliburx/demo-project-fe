import { BrokerRoutingModule } from './broker-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBrokerComponent } from './create-broker/create-broker.component';
import { BrokerDetailComponent } from './broker-detail/broker-detail.component';
import { BrokerStartComponent } from './broker-start/broker-start.component';
import { BrokerComponent } from './broker.component';

@NgModule({
  declarations: [
    BrokerComponent,
    CreateBrokerComponent,
    BrokerDetailComponent,
    BrokerStartComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    BrokerRoutingModule
  ]
})
export class BrokerModule { }
