import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DecisionComponent } from './component/decision/decision.component';
import { EntityComponent } from './component/entity/entity.component';

const routes: Routes = [
 { path: '', pathMatch: 'full', redirectTo: 'decision' },
 {
  path: 'decision',
  component: DecisionComponent,
 },
 {
  path: 'entity',
  component: EntityComponent,
 },
];

@NgModule({
 imports: [RouterModule.forChild(routes)],
 exports: [RouterModule],
})
export class MWRoutingModule {}
