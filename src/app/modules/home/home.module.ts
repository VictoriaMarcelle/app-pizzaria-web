import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListComponent } from './list/list.component';
import { FormCompoment } from './form/form.component';


@NgModule({
  declarations: [ HomeComponent, ListComponent, FormCompoment ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  exports: [ HomeComponent ]
})
export class HomeModule { }
