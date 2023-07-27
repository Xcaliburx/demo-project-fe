import { DeveloperRoutingModule } from './developer-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import { DeveloperComponent } from './developer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeveloperDetailComponent } from './developer-detail/developer-detail.component';
import { DeveloperStartComponent } from './developer-start/developer-start.component';
import { CreateDeveloperComponent } from './create-developer/create-developer.component';

@NgModule({
  declarations: [
    DeveloperComponent,
    ProjectComponent,
    DeveloperDetailComponent,
    DeveloperStartComponent,
    CreateDeveloperComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    DeveloperRoutingModule
  ]
})
export class DeveloperModule { }
