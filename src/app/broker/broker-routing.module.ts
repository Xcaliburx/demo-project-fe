import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrokerDetailComponent } from './broker-detail/broker-detail.component';
import { BrokerStartComponent } from './broker-start/broker-start.component';
import { BrokerComponent } from './broker.component';
import { CreateBrokerComponent } from './create-broker/create-broker.component';

const routes: Routes = [
  {
    path: '',
    component: BrokerComponent,
    children: [
      {
        path: '',
        component: BrokerStartComponent
      },
      {
        path: 'new',
        component: CreateBrokerComponent
      },
      {
        path: ':id',
        component: BrokerDetailComponent
      },
      {
        path: ':id/edit',
        component: CreateBrokerComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrokerRoutingModule { }
