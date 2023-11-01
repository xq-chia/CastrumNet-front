import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { TerminalRoutingModule } from './terminal-routing.module';
import { TerminalTerminalComponent } from './terminal/terminal.component';
import { NgTerminalModule } from 'ng-terminal';
import { TerminalService } from './terminal/terminal.service';

const COMPONENTS: Type<void>[] = [
  TerminalTerminalComponent];

@NgModule({
  imports: [
    SharedModule,
    TerminalRoutingModule,
    NgTerminalModule
  ],
  declarations: COMPONENTS,
  providers: [TerminalService]
})
export class TerminalModule { }
