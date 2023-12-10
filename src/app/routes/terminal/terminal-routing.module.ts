import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TerminalTerminalComponent } from './terminal/terminal.component';

const routes: Routes = [

  { path: 'terminal/:userHostId', component: TerminalTerminalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerminalRoutingModule { }
