import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostAssignmentListComponent } from './list/list.component';

const routes: Routes = [

  { path: 'list', component: HostAssignmentListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostAssignmentRoutingModule { }
