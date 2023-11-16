import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostHostComponent } from './host/host.component';

const routes: Routes = [

  { path: 'host', component: HostHostComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostRoutingModule { }
