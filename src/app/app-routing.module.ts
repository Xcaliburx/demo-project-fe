import { BrokerDetailComponent } from './broker/broker-detail/broker-detail.component';
import { CreateBrokerComponent } from './broker/create-broker/create-broker.component';
import { BrokerStartComponent } from './broker/broker-start/broker-start.component';
import { BrokerComponent } from './broker/broker.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/brokers',
    pathMatch: 'full'
  },
  {
    path: 'brokers',
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
