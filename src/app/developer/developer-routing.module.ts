import { DeveloperDetailComponent } from './developer-detail/developer-detail.component';
import { CreateDeveloperComponent } from './create-developer/create-developer.component';
import { DeveloperStartComponent } from './developer-start/developer-start.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DeveloperComponent } from './developer.component';

const routes:  Routes = [
  {
    path: '',
    component: DeveloperComponent,
    children: [
      {
        path: '',
        component: DeveloperStartComponent
      },
      {
        path: 'new',
        component: CreateDeveloperComponent
      },
      {
        path: ':id',
        component: DeveloperDetailComponent
      },
      {
        path: ':id/edit',
        component: CreateDeveloperComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloperRoutingModule { }
