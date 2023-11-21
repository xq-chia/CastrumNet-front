import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleAssignmentListComponent } from './list/list.component';

const routes: Routes = [

  { path: 'list', component: RoleAssignmentListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleAssignmentRoutingModule { }
