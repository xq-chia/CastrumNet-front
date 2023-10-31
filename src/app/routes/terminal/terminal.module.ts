import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { TerminalRoutingModule } from './terminal-routing.module';
import { TerminalTerminalComponent } from './terminal/terminal.component';
import { NgTerminalModule } from 'ng-terminal';

const COMPONENTS: Type<void>[] = [
  TerminalTerminalComponent];

@NgModule({
  imports: [
    SharedModule,
    TerminalRoutingModule,
    NgTerminalModule
  ],
  declarations: COMPONENTS,
})
export class TerminalModule { }
