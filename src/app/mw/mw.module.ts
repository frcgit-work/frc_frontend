import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MWRoutingModule } from './mw-routing.module';
import { DecisionComponent } from './component/decision/decision.component';
import { EntityComponent } from './component/entity/entity.component';


@NgModule({
  declarations: [
    DecisionComponent,
    EntityComponent
  ],
  imports: [
    CommonModule,
    MWRoutingModule
  ]
})
export class MWModule { }
