import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostListComponent } from './list/list.component';

const routes: Routes = [

  { path: 'list', component: HostListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostRoutingModule { }
